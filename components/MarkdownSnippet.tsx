import React, { useState, useCallback, useEffect } from 'react';
import { Input, Space, Typography, Tabs, Slider, Switch, Tooltip, Button, Select } from 'antd';
import * as Constants from '../utils/Constants';

const { Text, Title } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

interface Props {
    username?: string;
    theme: string;
}

export default function MarkdownSnippet(props: Props): JSX.Element | null {
    const { username, theme } = props;
    const [trackCount, setTrackCount] = useState<number>(5); // Varsayılan değeri 5
    const [width, setWidth] = useState<number>(400); // Varsayılan değeri 400
    const [uniqueTracks, setUniqueTracks] = useState<boolean>(false); // Varsayılan değeri hayır
    const [selectedBackground, setSelectedBackground] = useState<string>('https://spotifybackend.mdusova.com/proxy?url=https://spotify.mdusova.com/arkaplan1.png'); // Varsayılan arka plan
    const [previewImage, setPreviewImage] = useState<string | null>(null); // Önizleme için state
    const [loading, setLoading] = useState<boolean>(false); // Yükleniyor durumu

    if (!username) {
        return null;
    }

    const proxyUrl = 'https://spotifybackend.mdusova.com/proxy?url=';
    const svgSrc = `${proxyUrl}${encodeURIComponent(`${Constants.BaseUrl}/api?user=${username}`)}`;
    const updateParams = `&count=${trackCount}&width=${width}${uniqueTracks ? '&unique=true' : ''}`;
    const imageUrl = `${svgSrc}${encodeURIComponent(updateParams)}`;

    const handleWidthChange = useCallback((value: number | [number, number]) => {
        if (typeof value === 'number') {
            setWidth(value);
        }
    }, []);

    const handleTrackCountChange = useCallback((value: number | [number, number]) => {
        if (typeof value === 'number') {
            setTrackCount(value);
        }
    }, []);

    const backgrounds = [
        'https://spotifybackend.mdusova.com/proxy?url=https://spotify.mdusova.com/arkaplan1.png',
        'https://spotifybackend.mdusova.com/proxy?url=https://spotify.mdusova.com/arkaplan2.png',
        'https://spotifybackend.mdusova.com/proxy?url=https://spotify.mdusova.com/arkaplan3.png',
        'https://spotifybackend.mdusova.com/proxy?url=https://spotify.mdusova.com/arkaplan4.png',
        'https://spotifybackend.mdusova.com/proxy?url=https://spotify.mdusova.com/arkaplan5.png',
        'https://spotifybackend.mdusova.com/proxy?url=https://spotify.mdusova.com/arkaplan6.png',
    ];

    const handleBackgroundSelect = useCallback((background: string) => {
        setSelectedBackground(background);
    }, []);

    const loadImage = (src: string) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous'; // CORS başlığı
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    const mergeImageWithBackground = useCallback(async (apiImage: string, backgroundImage: string) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error("Canvas context alınamadı.");
        }

        const bgImg = await loadImage(backgroundImage);
        const apiImg = await loadImage(apiImage);

        canvas.width = bgImg.width;
        canvas.height = bgImg.height;

        ctx.drawImage(bgImg, 0, 0);

        const padding = 20;
        const imgX = (canvas.width - apiImg.width) / 2;
        const imgY = (canvas.height - apiImg.height) / 2;

        ctx.drawImage(apiImg, imgX + padding, imgY, apiImg.width - padding * 2, apiImg.height);

        return canvas.toDataURL('image/png');
    }, []);

    useEffect(() => {
        setLoading(true);
        mergeImageWithBackground(imageUrl, selectedBackground)
            .then((mergedImage) => {
                setPreviewImage(mergedImage);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Birleştirme hatası:", error);
                setLoading(false);
            });
    }, [imageUrl, selectedBackground, mergeImageWithBackground]);

    return (
        <div>
            <Title level={5} style={{ color: theme === 'dark' ? '#e0e0e0' : '#222222', marginBottom: '20px' }}>
                👤 "{username}" olarak giriş yapıldı.
            </Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="❓ Kodu Nasıl Eklerim?" key="1">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            HTML'e eklemek için kodunuz:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Lütfen bu kodu HTML kodunuzda eklemek istediğiniz yere ekleyin.
                        </Text>
                        <TextArea
                            className="htmlkodu"
                            autoSize
                            readOnly
                            value={`<img src="${svgSrc}${encodeURIComponent(updateParams)}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />`}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#e0e0e0' : '#222222'
                            }}
                        />
                        
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            Markdown'a eklemek için kodunuz:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Lütfen bu kodu markdown dosyanızda eklemek istediğiniz yere ekleyin.
                        </Text>
                        <TextArea
                            className="markdown"
                            autoSize
                            readOnly
                            value={`![Spotify Son Dinlenen Müzikler](${svgSrc}${encodeURIComponent(updateParams)})`}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#e0e0e0' : '#222222'
                            }}
                        />

                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            spotify.mdusova.com - Önizleme:
                        </Title>
                        <img
                            src={`${svgSrc}${encodeURIComponent(updateParams)}`}
                            alt="Spotify Son Dinlenen Müzikler"
                            key={updateParams}
                        />
                    </Space>
                </TabPane>

                <TabPane tab="🎨 Instagram Hikayesinde Paylaş" key="2">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            🎨 Arka Plan Seçimi:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Arka planı seçerek görselinize ekleyebilirsiniz. Varsayılan arka plan seçilmezse <br />
                            <code>spotify.mdusova.com/arkaplan1.png</code> arka planı kullanılacaktır.
                        </Text>
                        <Select
                            defaultValue={selectedBackground}
                            style={{ width: 200 }}
                            onChange={handleBackgroundSelect}
                        >
                            {backgrounds.map((background, index) => (
                                <Option key={index} value={background}>
                                    <img
                                        src={background}
                                        alt={`Arka Plan ${index + 1}`}
                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                    />
                                    Arka Plan {index + 1}
                                </Option>
                            ))}
                        </Select>

                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            🖼️ Önizleme:
                        </Title>
                        {loading ? (
                            <Text>Yükleniyor...</Text>
                        ) : previewImage ? (
                            <img
                                src={previewImage}
                                alt="Önizleme"
                                style={{ width: '100%', maxWidth: '500px' }}
                            />
                        ) : (
                            <Text>Önizleme yok.</Text>
                        )}

                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            📤 Instagram Hikayesi için Paylaş:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            Paylaşmak için aşağıdaki butona tıklayarak önizlemenizi Instagram hikayenize ekleyin.
                        </Text>
                        <Button type="primary" onClick={() => console.log('Instagram için paylaş')}>
                            Instagram'da Paylaş
                        </Button>
                    </Space>
                </TabPane>

                <TabPane tab="⚙️ Ayarları Yapılandırın" key="3">
                    <Space direction="vertical" size="large" style={{ marginBottom: 16 }}>
                        <div>
                            <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                                🎵 Listedeki Müzik Sayısı:
                            </Title>
                            <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                              ℹ️ Listede bulunan müzik sayısını bu ayar ile ayarlayabilirsiniz. <br /> Minimum değer: 1 / Maksimum değer: 10 (Varsayılan değer: 5)
                            </Text>
                            <Slider
                                defaultValue={trackCount}
                                min={1}
                                max={10}
                                onChange={handleTrackCountChange}
                                value={trackCount}
                                style={{ maxWidth: '400px' }}
                            />
                        </div>

                        <div>
                            <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                                📐 Liste Genişliği(px):
                            </Title>
                            <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                             ℹ️ Listenizin genişliğini bu ayar ile ayarlayabilirsiniz. <br /> Minimum değer: 300 / Maksimum değer: 1000 (Varsayılan değer: 400)
                            </Text>
                            <Slider
                                defaultValue={width}
                                min={200}
                                max={600}
                                onChange={handleWidthChange}
                                value={width}
                                style={{ maxWidth: '400px' }}
                            />
                        </div>

                        <div>
                            <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                                🎧 Tekrarlanan Müzikler:
                            </Title>
                            <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Listede tekrar dinlediğiniz müzikleri bu ayar ile gösterebilirsiniz.
                            </Text>
                            <Switch
                                checked={uniqueTracks}
                                onChange={setUniqueTracks}
                                checkedChildren="Göster"
                                unCheckedChildren="Gösterme"
                            />
                        </div>
                    </Space>
                </TabPane>
            </Tabs>
        </div>
    );
}
