import React, { useState } from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';

export interface VSCodeAppProps extends WindowAppProps {}

interface FileDef {
    name: string;
    language: string;
    content: string;
}

const FILES: FileDef[] = [
    {
        name: 'about.md',
        language: 'markdown',
        content: `# Alex Rivera

> Software Engineer

I'm a software engineer who enjoys building delightful,
well-crafted products. This is placeholder bio content —
swap it out for your own story in about.tsx.

- 🌍 Based in: Placeholder City
- 💼 Open to: Full-time opportunities
- 📫 Email: alex.rivera@example.com
`,
    },
    {
        name: 'experience.ts',
        language: 'typescript',
        content: `interface Job {
  company: string;
  role: string;
  dates: string;
}

const experience: Job[] = [
  {
    company: "Acme Corp",
    role: "Software Engineer",
    dates: "2023 - Present",
  },
  {
    company: "Startup Labs",
    role: "Software Engineering Intern",
    dates: "2021 - 2022",
  },
];

export default experience;
`,
    },
    {
        name: 'projects.json',
        language: 'json',
        content: `{
  "projects": [
    {
      "name": "This Portfolio OS",
      "stack": ["React", "TypeScript"],
      "repo": "github.com/iamsahan"
    },
    {
      "name": "Placeholder Project Two",
      "stack": ["TBD"],
      "repo": "github.com/iamsahan"
    },
    {
      "name": "Placeholder Project Three",
      "stack": ["TBD"],
      "repo": "github.com/iamsahan"
    }
  ]
}
`,
    },
    {
        name: 'contact.md',
        language: 'markdown',
        content: `# Contact

- GitHub: [github.com/iamsahan](https://github.com/iamsahan)
- LinkedIn: [in/sahanerandikaweerakkody](https://www.linkedin.com/in/sahanerandikaweerakkody)
- Email: alex.rivera@example.com

Feel free to reach out — always happy to chat!
`,
    },
];

const CODE_LINE_STYLE: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: '20px',
    whiteSpace: 'pre',
    margin: 0,
};

const highlightLine = (line: string, language: string, key: number) => {
    let color = '#d4d4d4';
    if (language === 'markdown') {
        if (line.startsWith('#')) color = '#569cd6';
        else if (line.trim().startsWith('>')) color = '#6a9955';
        else if (line.trim().startsWith('-')) color = '#ce9178';
    } else if (language === 'json') {
        color = /:/.test(line) ? '#9cdcfe' : '#ce9178';
    } else if (/\b(interface|const|export|default|import)\b/.test(line)) {
        color = '#569cd6';
    }
    return (
        <p key={key} style={Object.assign({}, CODE_LINE_STYLE, { color })}>
            {line || ' '}
        </p>
    );
};

const VSCodeApp: React.FC<VSCodeAppProps> = (props) => {
    const [activeFile, setActiveFile] = useState(FILES[0].name);
    const file = FILES.find((f) => f.name === activeFile) || FILES[0];

    return (
        <Window
            top={24}
            left={40}
            width={820}
            height={620}
            windowTitle="Code — portfolio-inner-site"
            windowBarIcon="myComputer"
            windowBarColor={Colors.tileVsCode}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'main*'}
        >
            <div style={styles.container}>
                <div style={styles.sidebar}>
                    <p style={styles.sidebarHeader}>EXPLORER</p>
                    <p style={styles.folderName}>PORTFOLIO-INNER-SITE</p>
                    {FILES.map((f) => (
                        <div
                            key={f.name}
                            onMouseDown={() => setActiveFile(f.name)}
                            style={Object.assign(
                                {},
                                styles.fileRow,
                                activeFile === f.name && styles.fileRowActive
                            )}
                        >
                            <p style={styles.fileText}>{f.name}</p>
                        </div>
                    ))}
                </div>
                <div style={styles.editorArea}>
                    <div style={styles.tabBar}>
                        {FILES.map((f) => (
                            <div
                                key={f.name}
                                onMouseDown={() => setActiveFile(f.name)}
                                style={Object.assign(
                                    {},
                                    styles.tab,
                                    activeFile === f.name && styles.tabActive
                                )}
                            >
                                <p style={styles.tabText}>{f.name}</p>
                            </div>
                        ))}
                    </div>
                    <div style={styles.editor}>
                        <div style={styles.lineNumbers}>
                            {file.content
                                .split('\n')
                                .map((_, i) => (
                                    <p key={i} style={styles.lineNumber}>
                                        {i + 1}
                                    </p>
                                ))}
                        </div>
                        <div style={styles.code}>
                            {file.content
                                .split('\n')
                                .map((line, i) =>
                                    highlightLine(line, file.language, i)
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1e1e1e',
    },
    sidebar: {
        width: 200,
        flexDirection: 'column',
        backgroundColor: '#252526',
        padding: 8,
        boxSizing: 'border-box',
    },
    sidebarHeader: {
        color: '#bbbbbb',
        fontSize: 11,
        letterSpacing: 1,
        marginBottom: 8,
        fontFamily: 'MSSerif',
    },
    folderName: {
        color: '#cccccc',
        fontSize: 12,
        marginBottom: 4,
        fontFamily: 'MSSerif',
    },
    fileRow: {
        padding: 4,
        paddingLeft: 16,
        cursor: 'pointer',
    },
    fileRowActive: {
        backgroundColor: '#37373d',
    },
    fileText: {
        color: '#cccccc',
        fontSize: 12,
        fontFamily: 'MSSerif',
    },
    editorArea: {
        flex: 1,
        flexDirection: 'column',
    },
    tabBar: {
        backgroundColor: '#252526',
        borderBottom: '1px solid #1e1e1e',
    },
    tab: {
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
        cursor: 'pointer',
        backgroundColor: '#2d2d2d',
        borderRight: '1px solid #1e1e1e',
    },
    tabActive: {
        backgroundColor: '#1e1e1e',
        borderTop: `2px solid ${Colors.tileVsCode}`,
    },
    tabText: {
        color: '#cccccc',
        fontSize: 12,
        fontFamily: 'MSSerif',
    },
    editor: {
        flex: 1,
        overflow: 'auto',
        padding: 12,
        boxSizing: 'border-box',
    },
    lineNumbers: {
        flexDirection: 'column',
        marginRight: 16,
        alignItems: 'flex-end',
    },
    lineNumber: {
        color: '#5a5a5a',
        fontSize: 13,
        fontFamily: 'monospace',
        lineHeight: '20px',
        margin: 0,
    },
    code: {
        flexDirection: 'column',
        flex: 1,
    },
};

export default VSCodeApp;
