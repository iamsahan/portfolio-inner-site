export type LanguageCode = 'en' | 'es' | 'fr';

export interface Language {
    code: LanguageCode;
    name: string;
}

export const LANGUAGES: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
];

const STRINGS: Record<LanguageCode, Record<string, string>> = {
    en: {
        start: 'Start',
        welcome: 'Welcome to PortfolioOS',
        shutDown: 'Shut down',
        settings: 'Settings',
    },
    es: {
        start: 'Inicio',
        welcome: 'Bienvenido a PortfolioOS',
        shutDown: 'Apagar',
        settings: 'Configuración',
    },
    fr: {
        start: 'Démarrer',
        welcome: 'Bienvenue sur PortfolioOS',
        shutDown: 'Arrêter',
        settings: 'Paramètres',
    },
};

export const t = (language: LanguageCode, key: string): string => {
    return STRINGS[language]?.[key] ?? STRINGS.en[key] ?? key;
};

export default STRINGS;
