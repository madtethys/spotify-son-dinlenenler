import React from 'react';
import { DesktopMarkdownSnippet } from './DesktopMarkdownSnippet';
import { MobileMarkdownSnippet } from './MobileMarkdownSnippet';

interface Props {
    username?: string;
}

const isMobile = () => window.innerWidth <= 768; // You can adjust this breakpoint

const MarkdownSnippet = (props: Props): JSX.Element | null => {
    const { username } = props;
    if (!username) {
        return null;
    }

    return isMobile() ? (
        <MobileMarkdownSnippet username={username} />
    ) : (
        <DesktopMarkdownSnippet username={username} />
    );
};

export default MarkdownSnippet;
