import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import { Icon } from '../general';
import { DesktopShortcutProps } from './DesktopShortcut';
import { t, LanguageCode } from '../../constants/i18n';
import { useSettings } from '../../hooks/useSettings';

export interface ToolbarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    shutdown: () => void;
    apps: DesktopShortcutProps[];
    language: LanguageCode;
}

const PINNED_APP_NAMES = ['GitHub', 'LinkedIn', 'Code', 'Browser'];

const Toolbar: React.FC<ToolbarProps> = ({
    windows,
    toggleMinimize,
    shutdown,
    apps,
    language,
}) => {
    const { soundOn, setSoundOn } = useSettings();
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let mins = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + mins + ' ' + amPm;
        return strTime;
    };

    const [startWindowOpen, setStartWindowOpen] = useState(false);
    const lastClickInside = useRef(false);

    const [lastActive, setLastActive] = useState('');

    useEffect(() => {
        let max = 0;
        let k = '';
        Object.keys(windows).forEach((key) => {
            if (windows[key].zIndex >= max) {
                max = windows[key].zIndex;
                k = key;
            }
        });
        setLastActive(k);
    }, [windows]);

    const [time, setTime] = useState(getTime());

    const updateTime = () => {
        setTime(getTime());
        setTimeout(() => {
            updateTime();
        }, 5000);
    };

    useEffect(() => {
        updateTime();
    });

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setStartWindowOpen(true);
        } else {
            setStartWindowOpen(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onStartWindowClicked = () => {
        setStartWindowOpen(true);
        lastClickInside.current = true;
    };

    const toggleStartWindow = () => {
        if (!startWindowOpen) {
            lastClickInside.current = true;
        } else {
            lastClickInside.current = false;
        }
    };

    const closeStart = () => {
        setStartWindowOpen(false);
        lastClickInside.current = false;
    };

    const openApp = (
        event: React.MouseEvent,
        app: DesktopShortcutProps
    ) => {
        event.stopPropagation();
        app.onOpen();
        closeStart();
    };

    const onShutdownClicked = (event: React.MouseEvent) => {
        event.stopPropagation();
        shutdown();
    };

    const pinnedApps = apps.filter((app) =>
        PINNED_APP_NAMES.includes(app.shortcutName)
    );

    const onQuickLaunchClicked = (
        event: React.MouseEvent,
        app: DesktopShortcutProps
    ) => {
        event.stopPropagation();
        app.onOpen();
    };

    return (
        <div style={styles.toolbarOuter}>
            {startWindowOpen && (
                <div onMouseDown={onStartWindowClicked} style={styles.startScreen}>
                    <div style={styles.startHeader}>
                        <p style={styles.startTitle}>{t(language, 'start')}</p>
                        <p style={styles.startSubtitle}>
                            {t(language, 'welcome')}
                        </p>
                    </div>
                    <div style={styles.tileGrid}>
                        {apps.map((app) => (
                            <div
                                key={app.shortcutName}
                                className="start-tile"
                                style={Object.assign({}, styles.tile, {
                                    backgroundColor:
                                        app.tileColor || Colors.tileBlue,
                                })}
                                onMouseDown={(e) => openApp(e, app)}
                            >
                                <Icon
                                    icon={app.icon}
                                    style={styles.tileIcon}
                                    size={40}
                                />
                                <p style={styles.tileLabel}>
                                    {app.shortcutName}
                                </p>
                            </div>
                        ))}
                        <div
                            className="start-tile"
                            style={Object.assign({}, styles.tile, {
                                backgroundColor: Colors.darkGray,
                            })}
                            onMouseDown={onShutdownClicked}
                        >
                            <Icon
                                icon="computerBig"
                                style={styles.tileIcon}
                                size={40}
                            />
                            <p style={styles.tileLabel}>
                                {t(language, 'shutDown')}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <div style={styles.toolbarInner}>
                <div style={styles.toolbar}>
                    <div
                        style={Object.assign(
                            {},
                            styles.startContainerOuter,
                            startWindowOpen && styles.activeTabOuter
                        )}
                        onMouseDown={toggleStartWindow}
                    >
                        <div style={styles.startContainer}>
                            <Icon
                                size={18}
                                icon="windowsStartIcon"
                                style={styles.startIcon}
                            />
                            <p className="toolbar-text ">Start</p>
                        </div>
                    </div>
                    <div style={styles.quickLaunch}>
                        {pinnedApps.map((app) => (
                            <div
                                key={app.shortcutName}
                                style={styles.quickLaunchButton}
                                onMouseDown={(e) =>
                                    onQuickLaunchClicked(e, app)
                                }
                                title={app.shortcutName}
                            >
                                <Icon
                                    size={20}
                                    icon={app.icon}
                                    style={styles.quickLaunchIcon}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={styles.toolbarTabsContainer}>
                        {Object.keys(windows).map((key) => {
                            return (
                                <div
                                    key={key}
                                    style={Object.assign(
                                        {},
                                        styles.tabContainerOuter,
                                        lastActive === key &&
                                            !windows[key].minimized &&
                                            styles.activeTabOuter
                                    )}
                                    onMouseDown={() => toggleMinimize(key)}
                                >
                                    <div style={styles.tabContainer}>
                                        <Icon
                                            size={18}
                                            icon={windows[key].icon}
                                            style={styles.tabIcon}
                                        />
                                        <p style={styles.tabText}>
                                            {windows[key].name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={styles.time}>
                    <div onMouseDown={() => setSoundOn(!soundOn)}>
                        <Icon
                            style={styles.volumeIcon}
                            icon={soundOn ? 'volumeOn' : 'volumeOff'}
                        />
                    </div>
                    <p style={styles.timeText}>{time}</p>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    toolbarOuter: {
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 40,
        background: Colors.navy,
        zIndex: 100000,
    },
    startScreen: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 40,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        padding: '48px 56px',
        background: `linear-gradient(135deg, ${Colors.navy} 0%, ${Colors.navyDark} 100%)`,
        overflowY: 'auto',
        zIndex: 200000,
    },
    startHeader: {
        flexDirection: 'column',
        marginBottom: 40,
    },
    startTitle: {
        fontFamily: 'Terminal',
        fontSize: 56,
        color: Colors.white,
        letterSpacing: 1,
        margin: 0,
    },
    startSubtitle: {
        fontFamily: 'MSSerif',
        fontSize: 14,
        color: Colors.lightGray,
        marginTop: 8,
    },
    tileGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: 16,
    },
    tile: {
        width: 140,
        height: 140,
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: 12,
        boxSizing: 'border-box',
        color: Colors.white,
        transition: 'transform 0.1s ease, filter 0.1s ease',
    },
    tileIcon: {
        alignSelf: 'flex-start',
    },
    tileLabel: {
        fontFamily: 'MSSerif',
        fontSize: 13,
        color: Colors.white,
        margin: 0,
    },
    activeTabOuter: {
        outline: `2px solid ${Colors.white}`,
        outlineOffset: -2,
    },
    startMenuIcon: {
        width: 32,
        height: 32,
    },
    tabContainerOuter: {
        display: 'flex',
        flex: 1,
        maxWidth: 260,
        marginRight: 2,
        boxSizing: 'border-box',
        cursor: 'pointer',
        background: Colors.navyDark,
    },
    tabContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        height: 40,
        flex: 1,
    },
    tabIcon: {
        marginRight: 8,
    },
    startContainer: {
        alignItems: 'center',
        flexShrink: 1,
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
    },
    startContainerOuter: {
        boxSizing: 'border-box',
        cursor: 'pointer',
        background: Colors.accent,
    },
    toolbarTabsContainer: {
        flex: 1,
        marginLeft: 2,
    },
    quickLaunch: {
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRight: `1px solid ${Colors.navyDark}`,
    },
    quickLaunchButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: 10,
    },
    quickLaunchIcon: {
        pointerEvents: 'none',
    },
    startIcon: {
        marginRight: 6,
    },
    toolbarInner: {
        alignItems: 'center',
        flex: 1,
        height: '100%',
    },
    toolbar: {
        flexGrow: 1,
        height: '100%',
        alignItems: 'stretch',
    },
    time: {
        flexShrink: 1,
        width: 96,
        height: '100%',
        boxSizing: 'border-box',
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        background: Colors.navyDark,
    },
    volumeIcon: {
        cursor: 'pointer',
        height: 18,
        filter: 'invert(1)',
    },
    tabText: {
        fontSize: 13,
        fontFamily: 'MSSerif',
        color: Colors.white,
    },
    timeText: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: Colors.white,
    },
};

export default Toolbar;
