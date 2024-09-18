import React, { useState, useCallback, useEffect } from 'react';
import Icon from '@ant-design/icons';
import { Input, Space, Typography, Tabs, Slider, Switch, Button, Select, message, Radio, RadioChangeEvent } from 'antd';
import * as Constants from '../utils/Constants';
import InstagramIcon from './InstagramIcon';

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
    const [dynamicSvgSrc, setDynamicSvgSrc] = useState<string>(`${Constants.BaseUrl}/api?user=${username}`);

    if (!username) {
        return null;
    }

    // Varsayılan URL, parametreler eklenmeden
    let svgSrc = `${Constants.BaseUrl}/api?user=${username}`;

useEffect(() => {
    let newSvgSrc = `${Constants.BaseUrl}/api?user=${username}`;

    if (trackCount !== 5) {
        newSvgSrc += `&count=${trackCount}`;
    }
    if (width !== 400) {
        newSvgSrc += `&width=${width}`;
    }
    if (uniqueTracks) {
        newSvgSrc += `&unique=${uniqueTracks}`;
    }

    setDynamicSvgSrc(newSvgSrc);
}, [trackCount, width, uniqueTracks, username]);

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

const handleBackgroundSelect = useCallback((e: RadioChangeEvent) => {
    setSelectedBackground(e.target.value);
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
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Lütfen bu kodu HTML kodunuzda eklemek istediğiniz yere ekleyin.
                        </Text>
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
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Lütfen bu kodu markdown dosyanızda eklemek istediğiniz yere ekleyin.
                        </Text>
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
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Lütfen arka planda kullanacağınız görüntüyü seçiniz.
                        </Text>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {backgrounds.map((background, index) => (
                                <div key={index} style={{ width: 'calc(50% - 5px)' }}>
                                    <Radio
                                        value={background}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '10px',
                                            backgroundColor: theme === 'dark' ? '#555' : '#f5f5f5',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            width: '100%',
                                        }}
                                        checked={selectedBackground === background}
                                        onChange={handleBackgroundSelect}
                                    >
                                        <img
                                            src={background}
                                            alt={`Arka Plan ${index + 1}`}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                marginRight: '10px',
                                                borderRadius: '8px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        Arka Plan {index + 1}
                                    </Radio>
                                </div>
                            ))}
                        </div>


                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            📤 Instagram Hikayesi için Paylaş:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Aşağıdaki butona basarak görseli indirebilir ve ardından Instagram hikayenizde paylaşabilirsiniz.
                        </Text>
                        <Button
                          className="instagram-share-btn"
                          shape="round"
                          icon={<Icon component={InstagramIcon} />}
                          size="large"
                          type="primary"
                          onClick={handleShareClick}
                          loading={loading}
                        >
                        Instagram Hikayende Paylaş
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
                                style={{ maxWidth: '600px' }}
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
                                min={300}
                                max={1000}
                                onChange={handleWidthChange}
                                value={width}
                                style={{ maxWidth: '600px' }}
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
