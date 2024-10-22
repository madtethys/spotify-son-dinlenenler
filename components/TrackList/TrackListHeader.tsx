import { Col, Image, Row, Space, Typography } from 'antd';
import SpotifyIcon from '../../public/spotify.svg';

const { Text } = Typography;

interface Props {

    username: string;
}


export default function TrackListHeader(props: Props): JSX.Element {
    return (
        <div style={{ display: 'flex' }}>
            <Space>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://open.spotify.com/user/${props.username}`}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image preview={false} className="spotify-icon" src={SpotifyIcon} width={100}></Image>
                </a>
                <Text className="spotify-title">Son Dinlediklerim</Text>
            </Space>
        </div>
    );
}
