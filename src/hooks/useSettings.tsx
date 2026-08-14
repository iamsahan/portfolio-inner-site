import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import WALLPAPERS from '../constants/wallpapers';
import { LanguageCode } from '../constants/i18n';

export interface Settings {
    wallpaperKey: string;
    brightness: number; // 50 - 150
    soundOn: boolean;
    language: LanguageCode;
}

const DEFAULT_SETTINGS: Settings = {
    wallpaperKey: WALLPAPERS[0].key,
    brightness: 100,
    soundOn: true,
    language: 'en',
};

const STORAGE_KEY = 'portfolio-os-settings';

const loadSettings = (): Settings => {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_SETTINGS;
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
        return DEFAULT_SETTINGS;
    }
};

interface SettingsContextValue extends Settings {
    setWallpaperKey: (key: string) => void;
    setBrightness: (value: number) => void;
    setSoundOn: (value: boolean) => void;
    setLanguage: (value: LanguageCode) => void;
    wallpaperBackground: string;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
    undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [settings, setSettings] = useState<Settings>(loadSettings);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);

    const setWallpaperKey = useCallback((key: string) => {
        setSettings((prev) => ({ ...prev, wallpaperKey: key }));
    }, []);

    const setBrightness = useCallback((value: number) => {
        setSettings((prev) => ({ ...prev, brightness: value }));
    }, []);

    const setSoundOn = useCallback((value: boolean) => {
        setSettings((prev) => ({ ...prev, soundOn: value }));
    }, []);

    const setLanguage = useCallback((value: LanguageCode) => {
        setSettings((prev) => ({ ...prev, language: value }));
    }, []);

    const wallpaperBackground =
        WALLPAPERS.find((w) => w.key === settings.wallpaperKey)?.background ||
        WALLPAPERS[0].background;

    return (
        <SettingsContext.Provider
            value={{
                ...settings,
                setWallpaperKey,
                setBrightness,
                setSoundOn,
                setLanguage,
                wallpaperBackground,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = (): SettingsContextValue => {
    const ctx = useContext(SettingsContext);
    if (!ctx) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return ctx;
};
