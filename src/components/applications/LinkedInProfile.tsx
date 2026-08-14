import React from 'react';
import Window from '../os/Window';
import Colors from '../../constants/colors';

export interface LinkedInProfileProps extends WindowAppProps {}

export const LINKEDIN_URL =
    'https://www.linkedin.com/in/sahanerandikaweerakkody';

const LINKEDIN_SNAPSHOT_URL = '/linkdin-profile.html';

export const LinkedInProfileContent: React.FC = () => {
    return (
        <div style={styles.page}>
            <iframe
                title="LinkedIn Profile"
                src={LINKEDIN_SNAPSHOT_URL}
                style={styles.iframe}
            />
        </div>
    );
};

const LinkedInProfile: React.FC<LinkedInProfileProps> = (props) => {
    return (
        <Window
            top={24}
            left={64}
            width={900}
            height={720}
            windowTitle="LinkedIn"
            windowBarIcon="linkedinIcon"
            windowBarColor={Colors.tileLinkedin}
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'in/sahanerandikaweerakkody'}
        >
            <LinkedInProfileContent />
        </Window>
    );
};

const styles: StyleSheetCSS = {
    page: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none',
        flex: 1,
    },
};

export default LinkedInProfile;
