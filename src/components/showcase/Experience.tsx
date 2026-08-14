import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Acme Corp</h1>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={'https://example.com/'}
                        >
                            <h4>www.acmecorp.example</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Software Engineer</h3>
                        <b>
                            <p>2023 - Present</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Placeholder company description. Replace this with a short
                    blurb about what the company does and the stack you used
                    there.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Placeholder bullet point describing a project you
                            architected or led.
                        </p>
                    </li>
                    <li>
                        <p>
                            Placeholder bullet point describing an impact you
                            had on the product or team.
                        </p>
                    </li>
                    <li>
                        <p>
                            Placeholder bullet point describing a technical
                            improvement you drove.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Startup Labs</h1>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={'https://example.com/'}
                        >
                            <h4>www.startuplabs.example</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Software Engineering Intern</h3>
                        <b>
                            <p>2021 - 2022</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Placeholder company description for a second role. Replace
                    with details about your responsibilities and the tools
                    you used.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Placeholder bullet point describing a feature you
                            shipped.
                        </p>
                    </li>
                    <li>
                        <p>
                            Placeholder bullet point describing a collaboration
                            or process improvement.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Experience;
