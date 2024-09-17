import React, { useState } from 'react';
import { Input, Space, Typography, Tabs, Slider, Switch, Tooltip, Button, Select } from 'antd';
import * as Constants from '../utils/Constants';
import axios from 'axios';

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
    const [backgroundImage, setBackgroundImage] = useState<string>('https://images.hdqwalls.com/download/landscape-reflection-lake-trees-in-1080x1920.jpg'); // Varsayılan arka plan resmi

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

    const handleBackgroundChange = (value: string) => {
        setBackgroundImage(value);
    };

const combineImages = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const backgroundImg = new Image();
    const overlayImg = new Image();

    backgroundImg.src = backgroundImage;
    overlayImg.src = imageUrl;

    backgroundImg.onload = () => {
        canvas.width = backgroundImg.width;
        canvas.height = backgroundImg.height;
        
        if (ctx) {
            ctx.drawImage(backgroundImg, 0, 0);

            overlayImg.onload = () => {
                const padding = 50;
                const overlayWidth = backgroundImg.width - 2 * padding;
                const overlayHeight = backgroundImg.height - 2 * padding;

                ctx.drawImage(
                    overlayImg,
                    padding,
                    padding,
                    overlayWidth,
                    overlayHeight
                );

                ctx.fillStyle = 'white';
                ctx.font = '30px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Şimdi son dinlediğin müzikleri paylaş!', canvas.width / 2, canvas.height - 40);
                ctx.fillText('spotify.mdusova.com', canvas.width / 2, canvas.height - 10);

                const finalImage = canvas.toDataURL('image/png');
                shareToInstagramStory(finalImage);
            };
        }
    };
};

    const shareToInstagramStory = async (finalImage: string) => {
        const instagramToken = Constants.InstagramAppToken;
        if (!instagramToken) {
            alert('Instagram token eksik. Görsel paylaşımı yapılamaz.');
            console.log('Instagram Token:', instagramToken);
            return;
        }
        try {
            // Medya nesnesi oluştur
            const mediaResponse = await axios.post(
                `https://graph.facebook.com/v16.0/{page_id}/media`,
                {
                    image_url: finalImage,
                    caption: "Spotify Son Dinlenenler",
                    access_token: instagramToken,
                }
            );

            const mediaId = mediaResponse.data.id;

            // Medya nesnesini yayınla
            await axios.post(
                `https://graph.facebook.com/v16.0/{page_id}/media_publish`,
                {
                    creation_id: mediaId,
                    access_token: instagramToken,
                }
            );

            alert('Görsel başarıyla paylaşıldı!');
        } catch (error) {
            console.error('Paylaşım hatası:', error);
            alert('Bir hata oluştu.');
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
                       <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#222222' }}>
                           🖼️ Arka Plan Resmini Seçin:
                       </Title>
                       <Select
                           defaultValue={backgroundImage}
                           style={{ width: '100%' }}
                           onChange={handleBackgroundChange}
                       >
                           <Option value="https://images.hdqwalls.com/download/landscape-reflection-lake-trees-in-1080x1920.jpg">
                               Arka Plan 1
                           </Option>
                           <Option value="https://images.hdqwalls.com/download/forest-river-1080x1920.jpg">
                               Arka Plan 2
                           </Option>
                           <Option value="https://images.hdqwalls.com/download/sunrise-over-mountains-1080x1920.jpg">
                               Arka Plan 3
                           </Option>
                           {/* Diğer arka plan seçenekleri buraya eklenebilir */}
                       </Select>
                   </Space>
               </TabPane>
           </Tabs>
           <Button onClick={combineImages} type="primary" style={{ marginTop: 20 }}>
               Instagram Stories'e Paylaş
           </Button>
       </div>
   );
   }
