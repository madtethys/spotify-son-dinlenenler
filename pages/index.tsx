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
    const [theme, setTheme] = useState<string>('light'); // Temayı yönetmek için bir state ekledik.
    const error = router.query['error'];

    useEffect(() => {
        const user = Cookie.get('spotifyuser');
        if (user) {
            setCurrentUser(user);
        }

        // Sayfa yüklendiğinde mevcut temayı almak için
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(currentTheme);
    }, []);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme); // Tema değişimini DOM'a yansıtıyoruz.
    };

    const handleClearCreds = () => {
        Cookie.remove('spotifyuser');
        window.location.reload();
    };

    return (
        <div className={`container ${theme}`}>
            <Head>
                <title>Spotify Son Çalınan Parçalar README Oluşturucu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Breadcrumb separator=">" style={{ marginBottom: 25 }}>
                <Breadcrumb.Item href="/">Anasayfa</Breadcrumb.Item>
            </Breadcrumb>

            <Button onClick={handleThemeToggle} style={{ marginBottom: '20px' }}>
                {theme === 'light' ? 'Dark Mode\'a Geç' : 'Light Mode\'a Geç'}
            </Button>

            <div>
                <Title level={2}>Spotify Son Çalınan Parçalar README Oluşturucu</Title>
                {error && <Alert message="Hata" description={error} type="error" style={{ marginBottom: 18 }} />}

                {!currentUser ? (
                    <Space className="vert-space" direction="vertical" size="middle">
                        <Text>Spotify'ı yetkilendirerek başlayalım.</Text>
                        <SpotifyAuthButton clientId={ClientId} redirectUri={RedirectUri} />
                    </Space>
                ) : (
                    <Space className="vert-space" direction="vertical" size="middle">
                        {/* Temayı MarkdownSnippet'e geçiyoruz */}
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
