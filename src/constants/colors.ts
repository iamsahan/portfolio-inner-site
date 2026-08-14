const colors = {
    white: '#FFFFFF',
    black: '#000000',
    turquoise: '#3e9697',
    lightGray: '#c3c6ca',
    darkGray: '#86898d',
    blue: '#0000a3',
    darkBlue: '#0000aa',
    red: '#ff0000',
    // Win8-style flat accent palette
    accent: '#2d89ef',
    navy: '#0a1f33',
    navyDark: '#061422',
    tileBlue: '#2d89ef',
    tileGreen: '#00a300',
    tilePurple: '#603cba',
    tileMagenta: '#b91d73',
    tileTeal: '#00aba9',
    tileOrange: '#ee6c1e',
    tileRed: '#e51400',
    tileLime: '#a4c400',
    tileGithub: '#24292e',
    tileLinkedin: '#0a66c2',
    tileVsCode: '#007acc',
} as const;

export type ColorName = keyof typeof colors;
export type ThemeColor = typeof colors[ColorName];

export default colors;
