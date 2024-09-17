import React, { useState } from 'react';
import { Input, Space, Typography, Tabs, Slider, Switch, Tooltip, Button, Select } from 'antd';
import * as Constants from '../utils/Constants';
import axios from 'axios';
import domtoimage from 'dom-to-image';  // dom-to-image kütüphanesini ekledik

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

    if (!username) {
        return null;
    }

    // SVG URL'sini ve parametreleri güncelle
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

    // SVG'yi PNG'ye dönüştürme ve paylaşım yapma
    const shareImage = async () => {
        const svgElement = document.querySelector('img'); // Görseli seçiyoruz
        if (!svgElement) return;

        try {
            const dataUrl = await domtoimage.toPng(svgElement); // SVG'yi PNG'ye dönüştürüyoruz
            const blob = await fetch(dataUrl).then(res => res.blob()); // PNG'yi Blob formatına çeviriyoruz
            const file = new File([blob], 'spotify-last-tracks.png', { type: 'image/png' }); // Paylaşılacak dosyayı oluşturuyoruz

            // Web Share API'yi kullanarak paylaşım yapıyoruz
            if (navigator.share) {
                await navigator.share({
                    title: 'Spotify Son Dinlenen Müzikler',
                    text: 'En son dinlediğim müziklere göz at!',
                    files: [file], // Paylaşılacak dosya
                });
            } else {
                alert('Tarayıcınız paylaşma özelliğini desteklemiyor.');
            }
        } catch (error) {
            console.error('Paylaşma hatası:', error);
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
                            ℹ️ Listede bulunan müzik sayısını bu ayar ile ayarlayabilirsiniz. <br /> Minimum değer: 1 / Maksimum değer: 10 (Varsayılan değer: 5) <br />API URL'sine <b>&count=girdiğinizdeğer</b> ekleyecektir.
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
                            ℹ️ Listenizin genişliğini bu ayar ile ayarlayabilirsiniz. <br /> Minimum değer: 300 / Maksimum değer: 1000 (Varsayılan değer: 400) <br />API URL'sine <b>&width=girdiğinizdeğer</b> ekleyecektir.
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
                            ℹ️ Listede tekrar dinlediğiniz müzikleri bu ayar ile gösterebilirsiniz. <br /> Gösterilsin veya gösterilmesin şeklindedir. Varsayılan olarak gösterilmeyecek şekilde ayarlıdır. <br />"Gösterilsin"i seçerseniz; API URL'sine <b>&unique=true</b> ekleyecektir. <br />"Gösterilmesin"i seçtiyseniz API URL'sine herhangi bir ekleme yapılmayacaktır.
                        </Text>
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
            
            {/* Paylaşım Butonu */}
            <Button type="primary" onClick={shareImage} style={{ marginTop: '20px' }}>
                🎉 Instagram'da Paylaş
            </Button>
        </div>
    );
}
