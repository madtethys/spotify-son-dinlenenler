import { Alert, Breadcrumb, Button, Space, Typography, Switch } from 'antd';
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
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const error = router.query['error'];

    useEffect(() => {
        const user = Cookie.get('spotifyuser');
        if (user) {
            setCurrentUser(user);
        }

        // Koyu mod tercihlerini kontrol et
        const darkModePreference = Cookie.get('darkMode');
        setDarkMode(darkModePreference === 'true');
        
        // Tema sınıfını ayarla
        document.body.className = darkMode ? 'dark-theme' : 'light-theme';
    }, [darkMode]);

    const handleClearCreds = () => {
        Cookie.remove('spotifyuser');
        window.location.reload();
    };

    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(checked);
        Cookie.set('darkMode', checked.toString());
    };

    return (
        <div className="container">
            <Head>
                <title>Spotify Son Çalınan Parçalar README Oluşturucu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Breadcrumb separator=">" style={{ marginBottom: 25 }}>
                <Breadcrumb.Item href="/">Anasayfa</Breadcrumb.Item>
            </Breadcrumb>

            <div className="switch-container">
                <Switch
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    checkedChildren="Koyu Mod"
                    unCheckedChildren="Açık Mod"
                />
            </div>

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
                        <MarkdownSnippet username={currentUser} />
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
