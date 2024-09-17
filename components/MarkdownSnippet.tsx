import React, { useState } from 'react';
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
    const [selectedBackground, setSelectedBackground] = useState<string>('spotify.mdusova.com/arkaplan1.png'); // Varsayılan arka plan

    if (!username) {
        return null;
    }

    // API URL ve parametrelerini güncelle
    const svgSrc = `${Constants.BaseUrl}/api?user=${username}`;
    const updateParams = `&count=${trackCount}&width=${width}${uniqueTracks ? '&unique=true' : ''}`;
    const imageUrl = `${svgSrc}${updateParams}`;

    const handleWidthChange = (value: number | [number, number]) => {
        if (typeof value === 'number') {
            setWidth(value);
        }
    };

    const handleTrackCountChange = (value: number | [number, number]) => {
        if (typeof value === 'number') {
            setTrackCount(value);
        }
    };

    const backgrounds = [
        'https://spotify.mdusova.com/arkaplan1.png',
        'https://spotify.mdusova.com/arkaplan2.png',
        'https://spotify.mdusova.com/arkaplan3.png',
        'https://spotify.mdusova.com/arkaplan4.png',
        'https://spotify.mdusova.com/arkaplan5.png',
        'https://spotify.mdusova.com/arkaplan6.png',
    ];

    const handleBackgroundSelect = (background: string) => {
        setSelectedBackground(background);
    };

    // Canvas ile arka plan ve API görselini birleştir
    const mergeImageWithBackground = async (apiImage: string, backgroundImage: string) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error("Canvas context alınamadı.");
        }

        const bgImg = new Image();
        const apiImg = new Image();
        bgImg.src = backgroundImage;
        apiImg.src = apiImage;

        await Promise.all([
            new Promise<void>((resolve) => { bgImg.onload = () => resolve(); }),
            new Promise<void>((resolve) => { apiImg.onload = () => resolve(); }),
        ]);

        // Canvas boyutlarını ayarla
        canvas.width = bgImg.width;
        canvas.height = bgImg.height;

        // Arka planı çiz
        ctx.drawImage(bgImg, 0, 0);

        // API görselini ortala ve kenarlarda boşluk bırak
        const padding = 20;
        const imgX = (canvas.width - apiImg.width) / 2;
        const imgY = (canvas.height - apiImg.height) / 2;

        ctx.drawImage(apiImg, imgX + padding, imgY, apiImg.width - padding * 2, apiImg.height);

        return canvas.toDataURL('image/png'); // PNG çıktısı
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
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Lütfen bu kodu markdown dosyanızda eklemek istediğiniz yere ekleyin.
                        </Text>
                        <TextArea
                            className="markdown"
                            autoSize
                            readOnly
                            value={`![Spotify Son Dinlenen Müzikler](${svgSrc}${updateParams})`}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#e0e0e0' : '#222222'
                            }}
                        />
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            spotify.mdusova.com - Önizleme:
                        </Title>
                        <img
                            src={`${svgSrc}${updateParams}`}
                            alt="Spotify Son Dinlenen Müzikler"
                            key={updateParams} // Key özelliğini ekleyerek her değişimde yeniden render edilmesini sağlıyoruz
                        />
                    </Space>
                </TabPane>

                <TabPane tab="❓ HTML'e Nasıl Eklerim?" key="2">
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
                            value={`<img src="${svgSrc}${updateParams}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />`}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#e0e0e0' : '#222222'
                            }}
                        />
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            spotify.mdusova.com - Önizleme:
                        </Title>
                        <img
                            src={`${svgSrc}${updateParams}`}
                            alt="Spotify Son Dinlenen Müzikler"
                            key={updateParams} // Key özelliğini ekleyerek her değişimde yeniden render edilmesini sağlıyoruz
                        />
                    </Space>
                </TabPane>

                <TabPane tab="⚙️ Ayarları Yapılandırın" key="3">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            📋 Listede Bulunacak Müzik Sayısı:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Listede bulunan müzik sayısını bu ayar ile ayarlayabilirsiniz. <br /> Minimum değer: 1 / Maksimum değer: 10 (Varsayılan değer: 5)
                        </Text>
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
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Listenizin genişliğini bu ayar ile ayarlayabilirsiniz. <br /> Minimum değer: 300 / Maksimum değer: 1000 (Varsayılan değer: 400)
                        </Text>
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
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Listede tekrar dinlediğiniz müzikleri bu ayar ile gösterebilirsiniz.
                        </Text>
                        <Switch
                            checked={uniqueTracks}
                            onChange={checked => setUniqueTracks(checked)}
                            className="switch"
                            checkedChildren="Gizle"
                            unCheckedChildren="Göster"
                        />

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
                                        alt={`Background ${index + 1}`}
                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                    />
                                    Arka Plan {index + 1}
                                </Option>
                            ))}
                        </Select>

                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                            🖼️ Instagram Hikayesi için Paylaş:
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#e0e0e0' : '#434242', fontSize: '14px' }}>
                            ℹ️ Seçtiğiniz arka plan ve API'den gelen görseli birleştirip Instagram hikayesi olarak paylaşabilirsiniz.
                        </Text>
                        <Button
                            type="primary"
                            onClick={async () => {
                                try {
                                    // Görseli arka planla birleştir
                                    const mergedImageUrl = await mergeImageWithBackground(imageUrl, selectedBackground);

                                    // Görseli indir
                                    const link = document.createElement('a');
                                    link.href = mergedImageUrl;
                                    link.download = `spotify_son_dinlenenler_mdusova_${username}.png`;
                                    link.click();

                                    // Instagram'a yönlendir
                                    window.open('https://www.instagram.com/create/story/', '_blank');
                                } catch (error) {
                                    console.error("Hata:", error);
                                    alert("Bir hata oluştu.");
                                }
                            }}
                        >
                            📤 Instagram Hikayesi Olarak İndir
                        </Button>
                    </Space>
                </TabPane>
            </Tabs>
        </div>
    );
}
