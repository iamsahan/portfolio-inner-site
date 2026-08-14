export interface Wallpaper {
    key: string;
    name: string;
    background: string;
}

const WALLPAPERS: Wallpaper[] = [
    {
        key: 'azure',
        name: 'Azure',
        background: 'linear-gradient(135deg, #2d89ef 0%, #0a1f33 100%)',
    },
    {
        key: 'violet',
        name: 'Violet',
        background: 'linear-gradient(135deg, #603cba 0%, #1a0f33 100%)',
    },
    {
        key: 'meadow',
        name: 'Meadow',
        background: 'linear-gradient(135deg, #00a300 0%, #06331a 100%)',
    },
    {
        key: 'sunset',
        name: 'Sunset',
        background: 'linear-gradient(135deg, #ee6c1e 0%, #b91d73 100%)',
    },
    {
        key: 'slate',
        name: 'Slate',
        background: 'linear-gradient(135deg, #86898d 0%, #202225 100%)',
    },
    {
        key: 'midnight',
        name: 'Midnight',
        background: 'linear-gradient(135deg, #061422 0%, #000000 100%)',
    },
];

export default WALLPAPERS;
