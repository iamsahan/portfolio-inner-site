import React, { useCallback, useEffect, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import ShowcaseExplorer from '../applications/ShowcaseExplorer';
import Doom from '../applications/Doom';
import OregonTrail from '../applications/OregonTrail';
import ShutdownSequence from './ShutdownSequence';
// import ThisComputer from '../applications/ThisComputer';
import Henordle from '../applications/Henordle';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import Scrabble from '../applications/Scrabble';
import { IconName } from '../../assets/icons';
import Credits from '../applications/Credits';
import Settings from '../applications/Settings';
import GitHubProfile from '../applications/GitHubProfile';
import LinkedInProfile from '../applications/LinkedInProfile';
import VSCodeApp from '../applications/VSCodeApp';
import Browser from '../applications/Browser';
import { useSettings } from '../../hooks/useSettings';

export interface DesktopProps {}

type ExtendedWindowAppProps<T> = T & WindowAppProps;

interface IconPosition {
    top: number;
    left: number;
}

const ICON_POSITIONS_KEY = 'desktopIconPositions';

const loadIconPositions = (): { [name: string]: IconPosition } => {
    try {
        return JSON.parse(localStorage.getItem(ICON_POSITIONS_KEY) || '{}');
    } catch {
        return {};
    }
};

interface DraggableIconProps {
    top: number;
    left: number;
    onPositionChange: (top: number, left: number) => void;
    children: React.ReactNode;
}

const DraggableIcon: React.FC<DraggableIconProps> = ({
    top,
    left,
    onPositionChange,
    children,
}) => {
    const [pos, setPos] = useState<IconPosition>({ top, left });
    const dragRef = useRef<{
        startX: number;
        startY: number;
        startTop: number;
        startLeft: number;
        dragging: boolean;
        top: number;
        left: number;
    } | null>(null);

    useEffect(() => {
        setPos({ top, left });
    }, [top, left]);

    const onMouseMove = useCallback((e: MouseEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
            drag.dragging = true;
        }
        if (drag.dragging) {
            const newTop = Math.max(0, drag.startTop + dy);
            const newLeft = Math.max(0, drag.startLeft + dx);
            drag.top = newTop;
            drag.left = newLeft;
            setPos({ top: newTop, left: newLeft });
        }
    }, []);

    const onMouseUp = useCallback(() => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        const drag = dragRef.current;
        if (drag && drag.dragging) {
            onPositionChange(drag.top, drag.left);
        }
        dragRef.current = null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onMouseMove, onPositionChange]);

    const onMouseDown = (e: React.MouseEvent) => {
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startTop: pos.top,
            startLeft: pos.left,
            dragging: false,
            top: pos.top,
            left: pos.left,
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div
            style={Object.assign({}, styles.shortcutContainer, {
                top: pos.top,
                left: pos.left,
            })}
            onMouseDown={onMouseDown}
        >
            {children}
        </div>
    );
};

const APPLICATIONS: {
    [key in string]: {
        key: string;
        name: string;
        shortcutIcon: IconName;
        tileColor: string;
        component?: React.FC<ExtendedWindowAppProps<any>>;
        externalUrl?: string;
    };
} = {
    // computer: {
    //     key: 'computer',
    //     name: 'This Computer',
    //     shortcutIcon: 'computerBig',
    //     component: ThisComputer,
    // },
    showcase: {
        key: 'showcase',
        name: 'My Portfolio',
        shortcutIcon: 'showcaseIcon',
        tileColor: Colors.tileBlue,
        component: ShowcaseExplorer,
    },
    trail: {
        key: 'trail',
        name: 'The Oregon Trail',
        shortcutIcon: 'trailIcon',
        tileColor: Colors.tileGreen,
        component: OregonTrail,
    },
    doom: {
        key: 'doom',
        name: 'Doom',
        shortcutIcon: 'doomIcon',
        tileColor: Colors.tileRed,
        component: Doom,
    },
    scrabble: {
        key: 'scrabble',
        name: 'Scrabble',
        shortcutIcon: 'scrabbleIcon',
        tileColor: Colors.tilePurple,
        component: Scrabble,
    },
    henordle: {
        key: 'henordle',
        name: 'Wordle Clone',
        shortcutIcon: 'henordleIcon',
        tileColor: Colors.tileTeal,
        component: Henordle,
    },
    credits: {
        key: 'credits',
        name: 'Credits',
        shortcutIcon: 'credits',
        tileColor: Colors.tileOrange,
        component: Credits,
    },
    settings: {
        key: 'settings',
        name: 'Settings',
        shortcutIcon: 'computerBig',
        tileColor: Colors.tileLime,
        component: Settings,
    },
    github: {
        key: 'github',
        name: 'GitHub',
        shortcutIcon: 'githubIcon',
        tileColor: Colors.tileGithub,
        component: GitHubProfile,
    },
    linkedin: {
        key: 'linkedin',
        name: 'LinkedIn',
        shortcutIcon: 'linkedinIcon',
        tileColor: Colors.tileLinkedin,
        component: LinkedInProfile,
    },
    vscode: {
        key: 'vscode',
        name: 'Code',
        shortcutIcon: 'myComputer',
        tileColor: Colors.tileVsCode,
        component: VSCodeApp,
    },
    browser: {
        key: 'browser',
        name: 'Browser',
        shortcutIcon: 'windowExplorerIcon',
        tileColor: Colors.accent,
        component: Browser,
    },
};

const Desktop: React.FC<DesktopProps> = (props) => {
    const { wallpaperBackground, brightness, language } = useSettings();
    const [windows, setWindows] = useState<DesktopWindows>({});

    const [shortcuts, setShortcuts] = useState<DesktopShortcutProps[]>([]);
    const [iconPositions, setIconPositions] = useState<{
        [name: string]: IconPosition;
    }>(loadIconPositions);

    const onIconPositionChange = useCallback(
        (name: string, top: number, left: number) => {
            setIconPositions((prev) => {
                const next = { ...prev, [name]: { top, left } };
                localStorage.setItem(ICON_POSITIONS_KEY, JSON.stringify(next));
                return next;
            });
        },
        []
    );

    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);

    useEffect(() => {
        if (shutdown === true) {
            rebootDesktop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shutdown]);

    useEffect(() => {
        const newShortcuts: DesktopShortcutProps[] = [];
        Object.keys(APPLICATIONS).forEach((key) => {
            const app = APPLICATIONS[key];
            newShortcuts.push({
                shortcutName: app.name,
                icon: app.shortcutIcon,
                tileColor: app.tileColor,
                onOpen: () => {
                    if (app.externalUrl) {
                        window.open(
                            app.externalUrl,
                            '_blank',
                            'noopener,noreferrer'
                        );
                        return;
                    }
                    if (!app.component) return;
                    const Component = app.component;
                    addWindow(
                        app.key,
                        <Component
                            onInteract={() => onWindowInteract(app.key)}
                            onMinimize={() => minimizeWindow(app.key)}
                            onClose={() => removeWindow(app.key)}
                            key={app.key}
                        />
                    );
                },
            });
        });

        newShortcuts.forEach((shortcut) => {
            if (shortcut.shortcutName === 'My Portfolio') {
                shortcut.onOpen();
            }
        });

        setShortcuts(newShortcuts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    const removeWindow = useCallback((key: string) => {
        // Absolute hack and a half
        setTimeout(() => {
            setWindows((prevWindows) => {
                const newWindows = { ...prevWindows };
                delete newWindows[key];
                return newWindows;
            });
        }, 100);
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const newWindows = { ...prevWindows };
            newWindows[key].minimized = true;
            return newWindows;
        });
    }, []);

    const getHighestZIndex = useCallback((): number => {
        let highestZIndex = 0;
        Object.keys(windows).forEach((key) => {
            const window = windows[key];
            if (window) {
                if (window.zIndex > highestZIndex)
                    highestZIndex = window.zIndex;
            }
        });
        return highestZIndex;
    }, [windows]);

    const toggleMinimize = useCallback(
        (key: string) => {
            const newWindows = { ...windows };
            const highestIndex = getHighestZIndex();
            if (
                newWindows[key].minimized ||
                newWindows[key].zIndex === highestIndex
            ) {
                newWindows[key].minimized = !newWindows[key].minimized;
            }
            newWindows[key].zIndex = getHighestZIndex() + 1;
            setWindows(newWindows);
        },
        [windows, getHighestZIndex]
    );

    const onWindowInteract = useCallback(
        (key: string) => {
            setWindows((prevWindows) => ({
                ...prevWindows,
                [key]: {
                    ...prevWindows[key],
                    zIndex: 1 + getHighestZIndex(),
                },
            }));
        },
        [setWindows, getHighestZIndex]
    );

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns(numShutdowns + 1);
        }, 600);
    }, [numShutdowns]);

    const addWindow = useCallback(
        (key: string, element: JSX.Element) => {
            setWindows((prevState) => ({
                ...prevState,
                [key]: {
                    zIndex: getHighestZIndex() + 1,
                    minimized: false,
                    component: element,
                    name: APPLICATIONS[key].name,
                    icon: APPLICATIONS[key].shortcutIcon,
                },
            }));
        },
        [getHighestZIndex]
    );

    return !shutdown ? (
        <div
            style={Object.assign({}, styles.desktop, {
                background: wallpaperBackground,
                filter: `brightness(${brightness}%)`,
            })}
        >
            {/* For each window in windows, loop over and render  */}
            {Object.keys(windows).map((key) => {
                const element = windows[key].component;
                if (!element) return <div key={`win-${key}`}></div>;
                return (
                    <div
                        key={`win-${key}`}
                        style={Object.assign(
                            {},
                            { zIndex: windows[key].zIndex },
                            windows[key].minimized && styles.minimized
                        )}
                    >
                        {React.cloneElement(element, {
                            key,
                            onInteract: () => onWindowInteract(key),
                            onClose: () => removeWindow(key),
                        })}
                    </div>
                );
            })}
            <div style={styles.shortcuts}>
                {shortcuts.map((shortcut, i) => {
                    const itemsPerColumn = 7;
                    const defaultPosition = {
                        top: (i % itemsPerColumn) * 104,
                        left: Math.floor(i / itemsPerColumn) * 88,
                    };
                    const position =
                        iconPositions[shortcut.shortcutName] || defaultPosition;
                    return (
                        <DraggableIcon
                            key={shortcut.shortcutName}
                            top={position.top}
                            left={position.left}
                            onPositionChange={(top, left) =>
                                onIconPositionChange(
                                    shortcut.shortcutName,
                                    top,
                                    left
                                )
                            }
                        >
                            <DesktopShortcut
                                icon={shortcut.icon}
                                shortcutName={shortcut.shortcutName}
                                onOpen={shortcut.onOpen}
                            />
                        </DraggableIcon>
                    );
                })}
            </div>
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
                apps={shortcuts}
                language={language}
            />
        </div>
    ) : (
        <ShutdownSequence
            setShutdown={setShutdown}
            numShutdowns={numShutdowns}
        />
    );
};

const styles: StyleSheetCSS = {
    desktop: {
        minHeight: '100%',
        flex: 1,
        background: `linear-gradient(135deg, ${Colors.accent} 0%, ${Colors.navy} 100%)`,
    },
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#1d2e2f',
    },
    shortcutContainer: {
        position: 'absolute',
    },
    shortcuts: {
        position: 'absolute',
        top: 16,
        left: 6,
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
    },
};

export default Desktop;
