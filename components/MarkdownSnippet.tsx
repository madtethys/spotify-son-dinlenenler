import { useEffect, useState } from 'react';
import { Input, Space, Typography, Tabs, Slider, Switch, Tooltip } from 'antd';
import * as Constants from '../utils/Constants';

const { Text, Title } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

interface Props {
    username?: string;
    theme: string;
}

export default function MarkdownSnippet(props: Props): JSX.Element | null {
    const { username, theme } = props;
    const [trackCount, setTrackCount] = useState<number>(5);
    const [width, setWidth] = useState<number>(400);
    const [uniqueTracks, setUniqueTracks] = useState<boolean>(false);
    const [pngSrc, setPngSrc] = useState<string | null>(null);

    if (!username) {
        return null;
    }

    const svgSrc = `${Constants.BaseUrl}/api?user=${username}`;
    const updateParams = `&count=${trackCount}&width=${width}${uniqueTracks ? '&unique=true' : ''}`;
    const markdownCode = `![Spotify Son Dinlenen Müzikler](${svgSrc}${updateParams})`;
    const htmlCode = `<img src="${svgSrc}${updateParams}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />`;

    useEffect(() => {
        const svgImage = new Image();
        svgImage.src = `${svgSrc}${updateParams}`;
        svgImage.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = svgImage.width;
                canvas.height = svgImage.height;
                context.drawImage(svgImage, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const pngDataUrl = URL.createObjectURL(blob);
                        setPngSrc(pngDataUrl);
                    }
                }, 'image/png');
            }
        };
    }, [svgSrc, updateParams]);

    const handleShareOnInstagram = () => {
        if (pngSrc) {
            window.open(
                'https://www.instagram.com/', // Instagram ana sayfasına yönlendirir
                '_blank'
            );
            alert('Resmi telefonunuza indirin ve Instagram uygulamasında paylaşın!');
        }
    };

    return (
        <div>
            <Title level={5} style={{ color: theme === 'dark' ? '#e0e0e0' : '#222222', marginBottom: '20px' }}>
                👤 "{username}" olarak giriş yapıldı.
            </Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="❓ Markdown'a Nasıl Eklerim?" key="1">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            Markdown'a eklemek için kodunuz:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>ℹ️ Lütfen bu kodu markdown dosyanızda eklemek istediğiniz yere ekleyin.</Text>
                        <TextArea
                            className="markdown"
                            autoSize
                            readOnly
                            value={markdownCode}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#e0e0e0' : '#222222'
                            }}
                        />
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            spotify.mdusova.com - Önizleme:
                        </Title>
                        <img
                            src={pngSrc || `${svgSrc}${updateParams}`}
                            alt="Spotify Son Dinlenen Müzikler"
                            key={updateParams}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                if (pngSrc) {
                                    const link = document.createElement('a');
                                    link.href = pngSrc;
                                    link.download = 'spotify_recent_tracks.png'; // İndirilecek dosyanın adı
                                    link.click();
                                }
                            }}
                        />
                        <button onClick={handleShareOnInstagram}>
                            Instagram Hikayesine Paylaş
                        </button>
                    </Space>
                </TabPane>
                <TabPane tab="❓ HTML'e Nasıl Eklerim?" key="2">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            HTML'e eklemek için kodunuz:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>ℹ️ Lütfen bu kodu HTML kodunuzda eklemek istediğiniz yere ekleyin.</Text>
                        <TextArea
                            className="htmlkodu"
                            autoSize
                            readOnly
                            value={htmlCode}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#e0e0e0' : '#222222'
                            }}
                        />
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            spotify.mdusova.com - Önizleme:
                        </Title>
                        <img
                            src={pngSrc || `${svgSrc}${updateParams}`}
                            alt="Spotify Son Dinlenen Müzikler"
                            key={updateParams}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                if (pngSrc) {
                                    const link = document.createElement('a');
                                    link.href = pngSrc;
                                    link.download = 'spotify_recent_tracks.png'; // İndirilecek dosyanın adı
                                    link.click();
                                }
                            }}
                        />
                        <button onClick={handleShareOnInstagram}>
                            Instagram Hikayesine Paylaş
                        </button>
                    </Space>
                </TabPane>
                <TabPane tab="⚙️ Ayarları Yapılandırın" key="3">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            📋 Listede Bulunacak Müzik Sayısı:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>ℹ️ Listede bulunan müizk sayısını bu ayar ile ayarlayabilirsiniz. <br /> Minimum değer: 1 / Maksimum değer: 10 (Varsayılan değer: 5) <br />API URL'sine <b>&count=girdiğinizdeğer</b> ekleyecektir.</Text>
                        <Tooltip title={`${trackCount} müzik`}>
                            <Slider
                                min={1}
                                max={10}
                                step={1}
                                value={trackCount}
                                onChange={handleTrackCountChange}
                                className="slider"
                            />
                        </Tooltip>
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            ↔️ Listenin Genişliği(px):
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>ℹ️ Listenizin genişliğini bu ayar ile ayarlayabilirsiniz. <br /> Minimum değer: 300 / Maksimum değer: 1000 (Varsayılan değer: 400) <br />API URL'sine <b>&width=girdiğinizdeğer</b> ekleyecektir.</Text>
                        <Tooltip title={`${width}px`}>
                            <Slider
                                min={300}
                                max={1000}
                                step={1}
                                value={width}
                                onChange={handleWidthChange}
                                className="slider"
                            />
                        </Tooltip>
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            🔁 Tekrar Dinlenen Müzikler:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>ℹ️ Listede tekrar dinlediğiniz müzikleri bu ayar ile gösterebilirsiniz. <br /> Gösterilsin veya gösterilmesin şeklindedir. Varsayılan olarak gösterilmeyecek şekilde ayarlıdır. <br />"Gösterilsin"i seçerseniz; API URL'sine <b>&unique=true</b> ekleyecektir. <br />"Gösterilmesin"i seçtiyseniz API URL'sine herhangi bir eklemek yapılmayacaktır.</Text>
                        <Switch
                            checked={uniqueTracks}
                            onChange={checked => setUniqueTracks(checked)}
                            checkedChildren="Gösterilsin"
                            unCheckedChildren="Gösterilmesin"
                            className="switch"
                        />
                    </Space>
                </TabPane>
            </Tabs>
        </div>
    );
}
