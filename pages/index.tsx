import { Alert, Breadcrumb, Button, Space, Typography } from 'antd';
import Cookie from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MarkdownSnippet from '../components/MarkdownSnippet';
import SpotifyAuthButton from '../components/SpotifyAuthButton';
import { ClientId, RedirectUri } from '../utils/Constants';
import { FaMoon, FaSun } from 'react-icons/fa'; // Importing icons

const { Text, Title } = Typography;

export default function Home(): JSX.Element {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
    const error = router.query['error'];
    const [theme, setTheme] = useState<string>('light'); // Default theme

    useEffect(() => {
        const savedTheme = Cookie.get('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        const user = Cookie.get('spotifyuser');
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const handleClearCreds = () => {
        Cookie.remove('spotifyuser');
        window.location.reload();
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        Cookie.set('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleViewSource = () => {
        window.open('https://github.com/madtethys/spotify-son-dinlenenler', '_blank'); 
    };

    const handleAnasayfa = () => {
        window.open('https://mdusova.com/'); 
    };


    return (
        <div className="container">
            <Head>
                <title>Spotify Son Dinlenen Müzikler by Mustafa Arda Düşova</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 25 }}>
                <Button onClick={handleAnasayfa} className="source-code-btn">
                    Anasayfa
                </Button>
                <Button onClick={handleViewSource} className="source-code-btn">
                    Kaynak Kodunu Görüntüle
                </Button>
                <Button onClick={toggleTheme} className="custom-button">
                    {theme === 'dark' ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
                </Button>
            </div>

            <div>
                <Title level={2} style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    🎧 Spotify Son Dinlenen Müzikler 
                </Title>
                {error && <Alert message="Hata" description={error} type="error" style={{ marginBottom: 18 }} />}
                {!currentUser ? (
                    <Space className="vert-space" direction="vertical" size="middle">
                        <Text style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                            Spotify'ı yetkilendirerek kullanmaya başlayabilirsiniz.
                        </Text>
                        <SpotifyAuthButton clientId={ClientId} redirectUri={RedirectUri} />
                    </Space>
                ) : (
                    <Space className="vert-space" direction="vertical" size="middle">
                        <MarkdownSnippet username={currentUser} theme={theme} />
                        <SpotifyAuthButton clientId={ClientId} redirectUri={RedirectUri} label="Yeniden Yetkilendir" />
                        <Button type="link" danger onClick={handleClearCreds}>
                            Yerel kimlik bilgilerini temizle
                        </Button>
                    </Space>
                )}
            </div>
        </div>
    );
}
