import Icon from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { getAuthorizeUri } from '../utils/SpotifyAuthUtil';
import SpotifyIcon from './SpotifyIcon';

const scopes: string[] = ['user-read-recently-played'];

interface Props {

    clientId: string | undefined;

    redirectUri: string | undefined;

    label?: string;
}

export default function SpotifyAuthButton(props: Props): JSX.Element {
    // Navigate to authorize URI
    const handleClick = () => {
        window.location.href = getAuthorizeUri(scopes);
    };

    const label = props.label ?? 'Spotify Hesabını Yetkilendir';
    return (
        <Button
            className="spotify-auth-btn"
            onClick={handleClick}
            type="primary"
            shape="round"
            icon={<Icon component={SpotifyIcon} />}
            size="large">
            {label}
        </Button>
    );
}
