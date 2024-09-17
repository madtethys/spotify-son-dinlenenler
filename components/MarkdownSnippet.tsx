import React, { useState } from 'react';
import { Input, Space, Typography, Tabs, Slider, Switch, Tooltip, Button } from 'antd';
import * as Constants from '../utils/Constants';
import axios from 'axios';

const { Text, Title } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;
const instagramToken = Constants.InstagramAppToken;

interface Props {
    username?: string;
    theme: string;
    instagramToken?: string;
}

export default function MarkdownSnippet(props: Props): JSX.Element | null {
    const { username, theme, instagramToken } = props;
    const [trackCount, setTrackCount] = useState<number>(5);
    const [width, setWidth] = useState<number>(400);
    const [uniqueTracks, setUniqueTracks] = useState<boolean>(false);

    if (!username) {
        return null;
    }

    const svgSrc = `${Constants.BaseUrl}/api?user=${username}`;
    const updateParams = `&count=${trackCount}&width=${width}${uniqueTracks ? '&unique=true' : ''}`;
    const imageUrl = `${svgSrc}${updateParams}`;
    const backgroundImageUrl = 'https://images.hdqwalls.com/download/landscape-reflection-lake-trees-in-1080x1920.jpg';

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

    const combineImages = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img1 = new Image();
        const img2 = new Image();

        img1.src = backgroundImageUrl;
        img2.src = imageUrl;

        img1.onload = () => {
            canvas.width = img1.width;
            canvas.height = img1.height;
            ctx?.drawImage(img1, 0, 0);

            img2.onload = () => {
                ctx?.drawImage(img2, 50, 50, img1.width - 100, img1.height - 100); // İkinci resmi biraz küçük ve merkezde göstereceğiz
                const finalImage = canvas.toDataURL('image/png');
                shareToInstagramStory(finalImage); // Instagram API'ye gönder
            };
        };
    };

    const shareToInstagramStory = async (finalImage: string) => {
        if (!instagramToken) {
            alert('Instagram token eksik. Görsel paylaşımı yapılamaz.');
            return;
        }
        try {
            const mediaResponse = await axios.post(
                `https://graph.facebook.com/v16.0/{page_id}/media`,
                {
                    image_url: finalImage,
                    caption: "Spotify Son Dinlenen Müzikler",
                    access_token: instagramToken,
                }
            );

            const mediaId = mediaResponse.data.id;

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
            {/* Diğer içerikler */}
            <Button onClick={combineImages} type="primary" style={{ marginTop: 20 }}>
            Instagram Hikayende Paylaş
            </Button>
        </div>
    );
}
