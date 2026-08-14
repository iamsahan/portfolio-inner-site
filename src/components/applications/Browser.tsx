import React, { useState } from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';
import { Icon } from '../general';
import { GitHubProfileContent, GITHUB_USERNAME } from './GitHubProfile';
import { LinkedInProfileContent } from './LinkedInProfile';

export interface BrowserProps extends WindowAppProps {}

interface Bookmark {
    label: string;
    url: string;
}

const BOOKMARKS: Bookmark[] = [
    { label: 'GitHub', url: `github.com/${GITHUB_USERNAME}` },
    { label: 'LinkedIn', url: 'linkedin.com/in/sahanerandikaweerakkody' },
];

const normalize = (raw: string) =>
    raw.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');

const Browser: React.FC<BrowserProps> = (props) => {
    const [history, setHistory] = useState<string[]>(['']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [addressInput, setAddressInput] = useState('');

    const currentUrl = history[historyIndex];

    const navigate = (raw: string) => {
        const url = normalize(raw);
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(url);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setAddressInput(url);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setAddressInput(history[historyIndex - 1]);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setAddressInput(history[historyIndex + 1]);
        }
    };

    const goHome = () => navigate('');

    const onSubmitAddress = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(addressInput);
    };

    const renderContent = () => {
        if (!currentUrl) {
            return (
                <div style={styles.home}>
                    <h2>New Tab</h2>
                    <br />
                    <p>Bookmarks</p>
                    <br />
                    <div style={styles.bookmarkRow}>
                        {BOOKMARKS.map((b) => (
                            <div
                                key={b.url}
                                className="big-button-container"
                                style={styles.bookmark}
                                onMouseDown={() => navigate(b.url)}
                            >
                                <p>{b.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        if (currentUrl.includes('github.com')) {
            return <GitHubProfileContent />;
        }
        if (currentUrl.includes('linkedin.com')) {
            return <LinkedInProfileContent />;
        }
        const looksLikeUrl = /\./.test(currentUrl);
        return (
            <div style={styles.blocked}>
                <h3>This site can't be displayed</h3>
                <br />
                <p>
                    {looksLikeUrl
                        ? `${currentUrl} refused to connect inside this browser (most sites block embedding).`
                        : `Couldn't find "${currentUrl}". Try a full address, or use a bookmark above.`}
                </p>
                <br />
                {looksLikeUrl && (
                    <a
                        className="site-button"
                        style={styles.openButton}
                        rel="noreferrer"
                        target="_blank"
                        href={`https://${currentUrl}`}
                    >
                        <p>Open in real browser ↗</p>
                    </a>
                )}
            </div>
        );
    };

    return (
        <Window
            top={28}
            left={72}
            width={780}
            height={640}
            windowTitle="Browser"
            windowBarIcon="windowExplorerIcon"
            windowBarColor={Colors.accent}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={currentUrl || 'New Tab'}
        >
            <div style={styles.container}>
                <div style={styles.toolbar}>
                    <div
                        style={Object.assign(
                            {},
                            styles.navButton,
                            historyIndex === 0 && styles.navButtonDisabled
                        )}
                        onMouseDown={goBack}
                    >
                        <p>◀</p>
                    </div>
                    <div
                        style={Object.assign(
                            {},
                            styles.navButton,
                            historyIndex === history.length - 1 &&
                                styles.navButtonDisabled
                        )}
                        onMouseDown={goForward}
                    >
                        <p>▶</p>
                    </div>
                    <div style={styles.navButton} onMouseDown={goHome}>
                        <Icon icon="myComputer" size={16} />
                    </div>
                    <form style={styles.addressForm} onSubmit={onSubmitAddress}>
                        <input
                            style={styles.addressInput}
                            type="text"
                            placeholder="Search or enter address"
                            value={addressInput}
                            onChange={(e) => setAddressInput(e.target.value)}
                        />
                    </form>
                    <div
                        className="site-button"
                        style={styles.goButton}
                        onMouseDown={() => navigate(addressInput)}
                    >
                        <p>Go</p>
                    </div>
                </div>
                <div style={styles.content}>{renderContent()}</div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    toolbar: {
        alignItems: 'center',
        padding: 6,
        boxSizing: 'border-box',
        backgroundColor: Colors.lightGray,
        borderBottom: `1px solid ${Colors.darkGray}`,
    },
    navButton: {
        width: 28,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: 4,
    },
    navButtonDisabled: {
        opacity: 0.35,
        pointerEvents: 'none',
    },
    addressForm: {
        flex: 1,
    },
    addressInput: {
        flex: 1,
        height: 24,
        boxSizing: 'border-box',
        padding: '0 8px',
    },
    goButton: {
        marginLeft: 6,
        padding: '4px 12px',
        cursor: 'pointer',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        backgroundColor: Colors.white,
    },
    home: {
        flexDirection: 'column',
        padding: 32,
        boxSizing: 'border-box',
        width: '100%',
    },
    bookmarkRow: {
        justifyContent: 'flex-start',
    },
    bookmark: {
        padding: 16,
        marginRight: 12,
        cursor: 'pointer',
        minWidth: 100,
        justifyContent: 'center',
    },
    blocked: {
        flexDirection: 'column',
        padding: 32,
        boxSizing: 'border-box',
        width: '100%',
    },
    openButton: {
        maxWidth: 220,
        padding: 8,
        textAlign: 'center',
        textDecoration: 'none',
        display: 'block',
    },
};

export default Browser;
