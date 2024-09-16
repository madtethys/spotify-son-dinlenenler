import { Space, Typography, Tabs, Switch, Slider } from 'antd';
import React, { useState, useCallback } from 'react';
import * as Constants from '../utils/Constants';
import './MarkdownSnippet.css'; // CSS dosyanızı import edin

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

    if (!username) {
        return null;
    }

    const generateUrl = useCallback(() => {
        const svgSrc = `${Constants.BaseUrl}/api?user=${username}`;
        const updateParams = `&count=${trackCount}&width=${width}${uniqueTracks ? '&unique=true' : ''}`;
        return `${svgSrc}${updateParams}`;
    }, [username, trackCount, width, uniqueTracks]);

    const finalUrl = generateUrl();
    const markdownCode = `![Spotify Son Dinlenen Müzikler](${finalUrl})`;
    const htmlCode = `<img src="${finalUrl}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />`;

    return (
        <div className={`container ${theme}`}>
            <Title level={5} className="header">
                "{username}" olarak giriş yapıldı.
            </Title>
            <Tabs defaultActiveKey="1" className="tabs">
                <TabPane tab="Markdown'a Nasıl Eklerim?" key="1">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Text className="description">Varsayılan Markdown Kodu:</Text>
                        <TextArea
                            className="markdown"
                            autoSize
                            readOnly
                            value={markdownCode}
                            className={`text-area ${theme}`}
                        />
                        <Text className="description">Önizleme:</Text>
                        <object type="image/svg+xml" data={finalUrl} className="preview"></object>
                    </Space>
                </TabPane>
                <TabPane tab="HTML'e Nasıl Eklerim?" key="2">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Text className="description">Varsayılan HTML Kodu:</Text>
                        <TextArea
                            className="htmlkodu"
                            autoSize
                            readOnly
                            value={htmlCode}
                            className={`text-area ${theme}`}
                        />
                        <Text className="description">Önizleme:</Text>
                        <object type="image/svg+xml" data={finalUrl} className="preview"></object>
                    </Space>
                </TabPane>
                <TabPane tab="Ayarlar" key="3">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} className="settings-title">
                            Ayarları Yapılandırın
                        </Title>
                        <Text className="description">Listede bulunacak müzik sayısını ayarlayın:</Text>
                        <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={trackCount}
                            onChange={value => setTrackCount(value as number)}
                            className={`slider ${theme}`}
                            marks={{ 1: '1', 10: '10' }}
                        />
                        <Text className="description">Listenin genişliğini ayarlayın (px):</Text>
                        <Slider
                            min={300}
                            max={1000}
                            step={1}
                            value={width}
                            onChange={value => setWidth(value as number)}
                            className={`slider ${theme}`}
                            marks={{ 300: '300px', 1000: '1000px' }}
                        />
                        <Text className="description">Listede tekrar dinlenen müzikleri göster:</Text>
                        <Switch
                            checked={uniqueTracks}
                            onChange={checked => setUniqueTracks(checked)}
                            checkedChildren="Evet"
                            unCheckedChildren="Hayır"
                            className={`switch ${theme}`}
                        />
                    </Space>
                </TabPane>
            </Tabs>
        </div>
    );
}
