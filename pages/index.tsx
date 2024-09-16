import { Alert, Breadcrumb, Button, Space, Typography } from 'antd';
import Cookie from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MarkdownSnippet from '../components/MarkdownSnippet';
import SpotifyAuthButton from '../components/SpotifyAuthButton';
import { ClientId, RedirectUri } from '../utils/Constants';

const { Text, Title } = Typography;

export default function Home(): JSX.Element {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
    const error = router.query['error'];
    const [theme, setTheme] = useState<string>('light'); // Default theme

    useEffect(() => {
        // Load theme from cookie or default to light
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
        window.open('https://github.com/madtethys/spotify-son-dinlenenler', '_blank'); // Replace with your repository URL
    };

    return (
        <div className="container">
            <Head>
                <title>Spotify Son Çalınan Parçalar README Oluşturucu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 25 }}>
                <Breadcrumb separator=">" style={{ marginRight: 20 }}>
                    <Breadcrumb.Item href="https://mdusova.com/">Anasayfa</Breadcrumb.Item>
                </Breadcrumb>
                <Button onClick={toggleTheme} style={{ marginRight: 20 }}>
                    {theme === 'dark' ? 'Aydınlık Mod' : 'Koyu Mod'}
                </Button>
                <Button onClick={handleViewSource}>
                    Kaynak Kodunu Görüntüle
                </Button>
            </div>

            <div>
                <Title level={2} style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    Spotify Son Çalınan Parçalar README Oluşturucu
                </Title>
                {error && <Alert message="Hata" description={error} type="error" style={{ marginBottom: 18 }} />}
                {!currentUser ? (
                    <Space className="vert-space" direction="vertical" size="middle">
                        <Text style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                            Spotify'ı yetkilendirerek başlayalım.
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
