import React from 'react';
// @ts-ignore
import saga from '../../../assets/pictures/projects/software/saga.mp4';
// @ts-ignore
import computer from '../../../assets/pictures/projects/software/computer.mp4';
// @ts-ignore
import scroll from '../../../assets/pictures/projects/software/scroll.mp4';
import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Software</h1>
            <h3>Projects</h3>
            <br />
            <p>
                Below are a few placeholder software projects — swap these
                out with your own favorites and add real screenshots, demos,
                and links.
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div className="text-block">
                <h2>This Portfolio OS</h2>
                <br />
                <p>
                    This site is a Windows-8-flavored desktop OS built as a
                    portfolio, based on an open-source Windows-95-style
                    portfolio concept. Replace this paragraph with the story
                    of how you built and customized your version.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={computer} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 1:</b> Placeholder demo clip — swap for
                            a recording of your own project.
                        </sub>
                    </p>
                </div>
                <p>
                    Placeholder technical breakdown. Describe the stack,
                    architecture, and any interesting engineering challenges
                    you solved while building this project.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/example/portfolio-website"
                        >
                            <p>
                                <b>[GitHub]</b> - Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Placeholder Project Two</h2>
                <br />
                <p>
                    Placeholder description for a second project — maybe a
                    game, tool, or app you built with a friend or on your own.
                    Describe what it does and why you built it.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={saga} />
                    <div style={styles.caption}>
                        <p>
                            <sub>
                                <b>Figure 2: </b> Placeholder demo clip.
                            </sub>
                        </p>
                    </div>
                </div>
                <p>
                    Placeholder paragraph describing an interesting technical
                    challenge you tackled on this project.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/example/placeholder-project-two"
                        >
                            <p>
                                <b>[GitHub]</b> - Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>Placeholder Project Three</h2>
                <br />
                <p>
                    Placeholder description for a smaller side project, such
                    as a browser extension, CLI tool, or utility you built to
                    scratch your own itch.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={scroll} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 3:</b> Placeholder demo clip.
                        </sub>
                    </p>
                </div>
                <p>
                    Placeholder paragraph wrapping up the project and linking
                    to where people can try it out.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/example/placeholder-project-three"
                        >
                            <p>
                                <b>[GitHub]</b> - Repository
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <ResumeDownload />
        </div>
    );
};

const styles: StyleSheetCSS = {
    video: {
        width: '100%',
        padding: 12,
    },
    caption: {
        width: '80%',
    },
};

export default SoftwareProjects;
