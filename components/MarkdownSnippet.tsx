import React, { useState, useCallback } from 'react';
import { Input, Space, Typography, Tabs, Slider, Switch, Button, Select, message } from 'antd';
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
    const [trackCount, setTrackCount] = useState<number>(5);
    const [width, setWidth] = useState<number>(400);
    const [uniqueTracks, setUniqueTracks] = useState<boolean>(false);
    const [selectedBackground, setSelectedBackground] = useState<string>('https://spotify.mdusova.com/arkaplan1.png');
    const [loading, setLoading] = useState<boolean>(false);

    if (!username) {
        return null;
    }

    // Varsayılan URL, parametreler eklenmeden
    let dynamicSvgSrc = `${Constants.BaseUrl}/api?user=${username}`;
    let svgSrc = `${Constants.BaseUrl}/api?user=${username}`;

    // Ayar yapıldığında dinamik URL'yi güncelle
    if (trackCount !== 5) {
        dynamicSvgSrc += `&tracks=${trackCount}`;
    }
    if (width !== 400) {
        dynamicSvgSrc += `&width=${width}`;
    }
    if (uniqueTracks) {
        dynamicSvgSrc += `&unique=${uniqueTracks}`;
    }

    const backgrounds = [
        'https://spotify.mdusova.com/arkaplan1.png',
        'https://spotify.mdusova.com/arkaplan2.png',
        'https://spotify.mdusova.com/arkaplan3.png',
        'https://spotify.mdusova.com/arkaplan4.png',
        'https://spotify.mdusova.com/arkaplan5.png',
        'https://spotify.mdusova.com/arkaplan6.png',
        'https://spotify.mdusova.com/arkaplan7.png',
        'https://spotify.mdusova.com/arkaplan8.png',
    ];

  const handleBackgroundSelect = useCallback((background: string) => {
        setSelectedBackground(background);
    }, []);

const svgToPng = async (svgUrl: string) => {
    const response = await fetch(svgUrl);
    const svgText = await response.text();

    // UTF-8 ile Base64 kodlama
    const base64 = btoa(unescape(encodeURIComponent(svgText)));

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + base64;
    await new Promise((resolve) => {
        img.onload = () => resolve(null);
    });
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
};

const mergeImageWithBackground = async (apiImage: string, backgroundImage: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const bgImg = await loadImage(backgroundImage);
    const apiImg = await loadImage(apiImage);

    canvas.width = bgImg.width;
    canvas.height = bgImg.height;

    ctx?.drawImage(bgImg, 0, 0);

    const padding = 20; // Boşluk ayarı
    const scaleFactor = 2.5; // Görseli büyütmek için ölçek faktörü
    const imgWidth = apiImg.width * scaleFactor;
    const imgHeight = apiImg.height * scaleFactor;

    const imgX = (canvas.width - imgWidth) / 2;
    const imgY = (canvas.height - imgHeight) / 2;

    ctx?.drawImage(apiImg, imgX + padding, imgY, imgWidth - padding * 2, imgHeight);

    return canvas.toDataURL('image/png');
};


    const loadImage = (src: string) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'use-credentials';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    const handleShareClick = async () => {
        setLoading(true);
        try {
            const pngImage = await svgToPng(svgSrc);
            const finalImage = await mergeImageWithBackground(pngImage, selectedBackground);
            const link = document.createElement('a');
            link.href = finalImage;
            link.download = `spotify_son_dinlenenler_${username}.png`;
            link.click();
            message.success('Resim indirildi, Instagram hikayenize yükleyebilirsiniz!');
        } catch (error) {
            console.error("Birleştirme hatası:", error);
            message.error('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div>
            <Title level={5} style={{ color: theme === 'dark' ? '#e0e0e0' : '#222222', marginBottom: '20px' }}>
                👤 "{username}" olarak giriş yapıldı.
            </Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="🌐 Websiteme Nasıl Eklerim?" key="1">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            HTML'e eklemek için kodunuz:
                        </Title>
                        <TextArea
                            className="htmlkodu"
                            autoSize
                            readOnly
                            value={`<img src="${dynamicSvgSrc}" alt="Spotify Son Dinlenen Müzikler - ${username}" />`}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#e0e0e0' : '#222222'
                            }}
                        />
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            Markdown'a eklemek için kodunuz:
                        </Title>
                        <TextArea
                            className="markdown"
                            autoSize
                            readOnly
                            value={`![Spotify Son Dinlenen Müzikler](${dynamicSvgSrc})`}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#e0e0e0' : '#222222'
                            }}
                        />

                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            Önizleme:
                        </Title>
                        <img src={dynamicSvgSrc} alt="Spotify Son Dinlenen Müzikler Önizleme" style={{ width: '100%', maxWidth: `${width}px` }} />
                    </Space>
                </TabPane>

                <TabPane tab="🎨 Instagram Hikayesinde Paylaş" key="2">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            🎨 Arka Plan Seçimi:
                        </Title>
                        <Select
                            defaultValue={selectedBackground}
                            style={{ width: 200 }}
                            onChange={handleBackgroundSelect}
                        >
                            {backgrounds.map((background, index) => (
                                <Option key={index} value='Arka Plan Seçiniz.'>
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
                            📤 Instagram Hikayesi için Paylaş:
                        </Title>
                        <Button type="primary" onClick={handleShareClick} loading={loading}>
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
