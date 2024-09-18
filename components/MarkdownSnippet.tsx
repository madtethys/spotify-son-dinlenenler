import React, { useState, useCallback } from 'react';
import { Input, Space, Typography, Tabs, Slider, Switch, Button, Select, message, Image } from 'antd';
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

    if (!username) return null;

    const svgSrc = `${Constants.BaseUrl}/api?user=${username}&count=${trackCount}&width=${width}${uniqueTracks ? '&unique=true' : ''}`;

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

    const handleWidthChange = useCallback((value: number) => {
        setWidth(value);
    }, []);

    const handleTrackCountChange = useCallback((value: number) => {
        setTrackCount(value);
    }, []);

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
                        <TextArea
                            className="htmlkodu"
                            autoSize
                            readOnly
                            value={`<img src="${svgSrc}" alt="Spotify Son Dinlenen Müzikler - ${username}" />`}
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
                            value={`![Spotify Son Dinlenen Müzikler](${svgSrc})`}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#e0e0e0' : '#222222'
                            }}
                        />
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            Önizleme:
                        </Title>
                        <Image
                            src={svgSrc}
                            alt="Spotify Son Dinlenen Müzikler Önizleme"
                            preview={false}
                            style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                        />
                    </Space>
                </TabPane>

                <TabPane tab="🎨 Instagram Hikayesinde Paylaş" key="2">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            🎨 Arka Plan Seçimi:
                        </Title>
                        <Select
                            value={selectedBackground}
                            style={{ width: 200 }}
                            onChange={handleBackgroundSelect}
                        >
                            {backgrounds.map((background, index) => (
                                <Option key={index} value="Arka Plan Seçiniz.">
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
                            📤 Instagram Hikayende Paylaş:
                        </Title>
                        <Button type="primary" onClick={handleShareClick} loading={loading}>
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
                            <Slider
                                min={1}
                                max={10}
                                value={trackCount}
                                onChange={handleTrackCountChange}
                                style={{ maxWidth: '400px' }}
                            />
                        </div>

                        <div>
                            <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                                📐 Liste Genişliği(px):
                            </Title>
                            <Slider
                                min={300}
                                max={1000}
                                value={width}
                                onChange={handleWidthChange}
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
