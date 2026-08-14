import React, { useEffect, useState } from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';

export interface GitHubProfileProps extends WindowAppProps {}

export const GITHUB_USERNAME = 'iamsahan';

interface GitHubUser {
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
    location: string | null;
}

export const GitHubProfileContent: React.FC = () => {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load');
                return res.json();
            })
            .then((data) => {
                if (!cancelled) {
                    setUser(data);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setError(true);
                    setLoading(false);
                }
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="site-page" style={styles.page}>
            {loading && <p>Loading GitHub profile...</p>}
            {error && (
                <p>
                    Couldn't load live GitHub data right now. You can still
                    view the profile directly:{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href={`https://github.com/${GITHUB_USERNAME}`}
                    >
                        github.com/{GITHUB_USERNAME}
                    </a>
                </p>
            )}
            {user && (
                <div style={styles.header}>
                    <img src={user.avatar_url} alt="" style={styles.avatar} />
                    <div style={styles.headerText}>
                        <h2>{user.name || user.login}</h2>
                        <p>@{user.login}</p>
                        {user.bio && <p>{user.bio}</p>}
                        <div style={styles.statRow}>
                            <p>
                                <b>{user.public_repos}</b> repos
                            </p>
                            <p>
                                <b>{user.followers}</b> followers
                            </p>
                            <p>
                                <b>{user.following}</b> following
                            </p>
                        </div>
                        <a
                            className="site-button"
                            style={styles.profileButton}
                            rel="noreferrer"
                            target="_blank"
                            href={user.html_url}
                        >
                            <p>Open Profile ↗</p>
                        </a>
                    </div>
                </div>
            )}
            <div style={styles.widgets}>
                <img
                    style={styles.widgetImage}
                    alt="GitHub stats"
                    src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true`}
                />
                <img
                    style={styles.widgetImage}
                    alt="Top languages"
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true`}
                />
                <img
                    style={styles.widgetImageWide}
                    alt="GitHub streak"
                    src={`https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true`}
                />
            </div>
        </div>
    );
};

const GitHubProfile: React.FC<GitHubProfileProps> = (props) => {
    return (
        <Window
            top={32}
            left={64}
            width={720}
            height={720}
            windowTitle="GitHub"
            windowBarIcon="githubIcon"
            windowBarColor={Colors.tileGithub}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={`github.com/${GITHUB_USERNAME}`}
        >
            <GitHubProfileContent />
        </Window>
    );
};

const styles: StyleSheetCSS = {
    page: {
        flexDirection: 'column',
        padding: 24,
        boxSizing: 'border-box',
        width: '100%',
        overflowY: 'auto',
    },
    header: {
        marginBottom: 24,
        alignItems: 'flex-start',
    },
    avatar: {
        width: 96,
        height: 96,
        marginRight: 20,
        border: `1px solid ${Colors.darkGray}`,
    },
    headerText: {
        flexDirection: 'column',
        flex: 1,
    },
    statRow: {
        marginTop: 8,
        marginBottom: 8,
        justifyContent: 'flex-start',
    },
    profileButton: {
        maxWidth: 180,
        padding: 8,
        marginTop: 8,
        textAlign: 'center',
        textDecoration: 'none',
        display: 'block',
    },
    widgets: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    widgetImage: {
        maxWidth: '100%',
        marginBottom: 16,
    },
    widgetImageWide: {
        maxWidth: '100%',
        marginBottom: 16,
    },
};

export default GitHubProfile;
