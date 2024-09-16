import { Alert, Button, Space, Typography, Layout } from 'antd';
import Cookie from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MarkdownSnippet from '../components/MarkdownSnippet';
import SpotifyAuthButton from '../components/SpotifyAuthButton';
import { ClientId, RedirectUri } from '../utils/Constants';

const { Text, Title } = Typography;
const { Footer } = Layout;

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
        window.location.href = 'https://mdusova.com/';
    };

    return (
        <div className="container">
            <Head>
                <title>Spotify Son Dinlenen Müzikler | mdusova.com</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="button-container">
                <Button onClick={handleAnasayfa} className="source-code-btn">
                    Anasayfa
                </Button>
                <Button onClick={handleViewSource} className="source-code-btn">
                    Kaynak Kodunu Görüntüle
                </Button>
                <Button onClick={toggleTheme} className="source-code-btn">
                    {theme === 'dark' ? '☀️ Aydınlık Temayı Kullan' : '🌙 Karanlık Temayı Kullan'}
                </Button>
            </div>

            <div className="content">
                <Title level={2} style={{ color: theme === 'dark' ? '#ffffff' : '#000000', textAlign: 'center' }}>
                    🎧 Spotify Son Dinlenen Müzikler
                </Title>
                {error && (
                    <Alert message="Hata" description={error} type="error" style={{ marginBottom: 18, textAlign: 'center' }} />
                )}
                {!currentUser ? (
                    <Space className="vert-space" direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Text style={{ color: theme === 'dark' ? '#ffffff' : '#000000', textAlign: 'center' }}>
                            <b>Spotify Hesabınızı Yetkilendirerek Son Dinlediğiniz Müzikleri Görüntüleyin!</b>
                            <br /><br />
                            Spotify hesabınızı yetkilendirerek, dinleme geçmişinizi kolayca görüntüleyebilir ve en son dinlediğiniz müzikleri keşfedebilirsiniz. Bu işlem, müzik dinleme alışkanlıklarınızı takip etmenize ve müzik zevkinizi daha iyi anlamanıza olanak tanır. Yetkilendirme işlemi hızlı ve güvenli bir şekilde gerçekleştirilir; tek yapmanız gereken Spotify hesabınıza giriş yapmak ve gerekli izinleri vermek.
                        </Text>
                        <div className="auth-button-container">
                            <SpotifyAuthButton clientId={ClientId} redirectUri={RedirectUri} />
                        </div>
                    </Space>
                ) : (
                    <Space className="vert-space" direction="vertical" size="middle" style={{ width: '100%' }}>
                        <MarkdownSnippet username={currentUser} theme={theme} />
                        <div className="auth-button-container">
                            <SpotifyAuthButton clientId={ClientId} redirectUri={RedirectUri} label="Yeniden Yetkilendir" />
                            <Button type="link" danger onClick={handleClearCreds} style={{ marginTop: '10px' }}>
                                Yerel kimlik bilgilerini temizle
                            </Button>
                        </div>
                    </Space>
                )}
            </div>

            <Footer className="site-footer">
                <div className="footer-content">
                    <p>Copyright © 2024 <a href="https://mdusova.com/" target="_blank" rel="noopener noreferrer">Mustafa Arda Düşova</a> - Tüm Hakları Saklıdır.</p>
                </div>
            </Footer>
        </div>
    );
}
