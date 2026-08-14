import React, { useState } from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';
import WALLPAPERS from '../../constants/wallpapers';
import { LANGUAGES } from '../../constants/i18n';
import { useSettings } from '../../hooks/useSettings';

export interface SettingsProps extends WindowAppProps {}

type SettingsTab = 'personalization' | 'display' | 'sound' | 'language';

const TABS: { key: SettingsTab; label: string }[] = [
    { key: 'personalization', label: 'Personalization' },
    { key: 'display', label: 'Display' },
    { key: 'sound', label: 'Sound' },
    { key: 'language', label: 'Language' },
];

const Settings: React.FC<SettingsProps> = (props) => {
    const [tab, setTab] = useState<SettingsTab>('personalization');
    const {
        wallpaperKey,
        setWallpaperKey,
        brightness,
        setBrightness,
        soundOn,
        setSoundOn,
        language,
        setLanguage,
    } = useSettings();

    return (
        <Window
            top={40}
            left={80}
            width={620}
            height={480}
            windowTitle="Settings"
            windowBarIcon="computerBig"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'PC settings'}
        >
            <div className="site-page" style={styles.container}>
                <div style={styles.sidebar}>
                    {TABS.map((t) => (
                        <div
                            key={t.key}
                            onMouseDown={() => setTab(t.key)}
                            style={Object.assign(
                                {},
                                styles.sidebarItem,
                                tab === t.key && styles.sidebarItemActive
                            )}
                        >
                            <p>{t.label}</p>
                        </div>
                    ))}
                </div>
                <div style={styles.content}>
                    {tab === 'personalization' && (
                        <div style={styles.section}>
                            <h3>Wallpaper</h3>
                            <br />
                            <div style={styles.wallpaperGrid}>
                                {WALLPAPERS.map((w) => (
                                    <div
                                        key={w.key}
                                        onMouseDown={() =>
                                            setWallpaperKey(w.key)
                                        }
                                        style={Object.assign(
                                            {},
                                            styles.wallpaperSwatch,
                                            { background: w.background },
                                            wallpaperKey === w.key &&
                                                styles.wallpaperSwatchActive
                                        )}
                                    >
                                        <p style={styles.wallpaperLabel}>
                                            {w.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {tab === 'display' && (
                        <div style={styles.section}>
                            <h3>Brightness</h3>
                            <br />
                            <p>{brightness}%</p>
                            <input
                                type="range"
                                min={50}
                                max={150}
                                value={brightness}
                                onChange={(e) =>
                                    setBrightness(Number(e.target.value))
                                }
                                style={styles.slider}
                            />
                        </div>
                    )}
                    {tab === 'sound' && (
                        <div style={styles.section}>
                            <h3>Sound</h3>
                            <br />
                            <div
                                className="site-button"
                                style={styles.toggleButton}
                                onMouseDown={() => setSoundOn(!soundOn)}
                            >
                                <p>{soundOn ? 'On — click to mute' : 'Muted — click to unmute'}</p>
                            </div>
                        </div>
                    )}
                    {tab === 'language' && (
                        <div style={styles.section}>
                            <h3>Language</h3>
                            <br />
                            {LANGUAGES.map((l) => (
                                <div
                                    key={l.code}
                                    onMouseDown={() => setLanguage(l.code)}
                                    style={Object.assign(
                                        {},
                                        styles.languageOption,
                                        language === l.code &&
                                            styles.languageOptionActive
                                    )}
                                >
                                    <p>{l.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        flex: 1,
        width: '100%',
    },
    sidebar: {
        width: 160,
        flexDirection: 'column',
        backgroundColor: Colors.lightGray,
        borderRight: `1px solid ${Colors.darkGray}`,
    },
    sidebarItem: {
        padding: 12,
        cursor: 'pointer',
        borderBottom: `1px solid ${Colors.darkGray}`,
    },
    sidebarItemActive: {
        backgroundColor: Colors.accent,
        color: Colors.white,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        boxSizing: 'border-box',
        overflowY: 'auto',
    },
    section: {
        flexDirection: 'column',
    },
    wallpaperGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
    },
    wallpaperSwatch: {
        width: 96,
        height: 64,
        cursor: 'pointer',
        boxSizing: 'border-box',
        border: `2px solid transparent`,
        justifyContent: 'flex-end',
        padding: 4,
    },
    wallpaperSwatchActive: {
        border: `2px solid ${Colors.white}`,
        outline: `2px solid ${Colors.accent}`,
    },
    wallpaperLabel: {
        color: Colors.white,
        fontSize: 11,
        fontFamily: 'MSSerif',
    },
    slider: {
        width: '100%',
        maxWidth: 300,
    },
    toggleButton: {
        maxWidth: 240,
        padding: 10,
        cursor: 'pointer',
        textAlign: 'center',
    },
    languageOption: {
        padding: 10,
        cursor: 'pointer',
        maxWidth: 240,
        border: `1px solid ${Colors.darkGray}`,
        marginBottom: 8,
    },
    languageOptionActive: {
        backgroundColor: Colors.accent,
        color: Colors.white,
    },
};

export default Settings;
