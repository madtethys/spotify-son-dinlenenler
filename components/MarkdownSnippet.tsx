import { Input, Space, Typography, Tabs, Slider, Switch, Tooltip } from 'antd';
import React, { useState } from 'react';
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
    const [trackCount, setTrackCount] = useState<number>(5); // Varsayılan değeri 5
    const [width, setWidth] = useState<number>(400); // Varsayılan değeri 400
    const [uniqueTracks, setUniqueTracks] = useState<boolean>(false); // Varsayılan değeri hayır

    if (!username) {
        return null;
    }

    const svgSrc = `${Constants.BaseUrl}/api?user=${username}`;
    const updateParams = `&count=${trackCount}&width=${width}${uniqueTracks ? '&unique=true' : ''}`;
    const markdownCode = `![Spotify Son Dinlenen Müzikler](${svgSrc}${updateParams})`;
    const htmlCode = `<img src="${svgSrc}${updateParams}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />`;

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

    return (
        <div>
            <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#000000', marginBottom: '20px' }}>
                "{username}" olarak giriş yapıldı.
            </Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Markdown'a Nasıl Eklerim?" key="1">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Text style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Varsayılan Markdown Kodu:</Text>
                        <TextArea
                            className="markdown"
                            autoSize
                            readOnly
                            value={markdownCode}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#ffffff' : '#000000'
                            }}
                        />
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                            Önizleme
                        </Title>
                        <object
                            type="image/svg+xml"
                            data={`${svgSrc}${updateParams}`}
                            style={{ width: '100%', height: 'auto' }}
                        >
                            Önizleme için SVG desteği bulunmuyor.
                        </object>
                    </Space>
                </TabPane>
                <TabPane tab="HTML'e Nasıl Eklerim?" key="2">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Text style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Varsayılan HTML Kodu:</Text>
                        <TextArea
                            className="htmlkodu"
                            autoSize
                            readOnly
                            value={htmlCode}
                            style={{
                                backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
                                color: theme === 'dark' ? '#ffffff' : '#000000'
                            }}
                        />
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                            Önizleme
                        </Title>
                        <object
                            type="image/svg+xml"
                            data={`${svgSrc}${updateParams}`}
                            style={{ width: '100%', height: 'auto' }}
                        >
                            Önizleme için SVG desteği bulunmuyor.
                        </object>
                    </Space>
                </TabPane>
                <TabPane tab="Ayarlar" key="3">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Title level={5} style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                            Ayarları Yapılandırın
                        </Title>
                        <Text style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Listede bulunacak müzik sayısını ayarlayın:</Text>
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
                        <Text style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Listenin genişliğini ayarlayın (px):</Text>
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
                        <Text style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>Listede tekrar dinlenen müzikleri göster:</Text>
                        <Switch
                            checked={uniqueTracks}
                            onChange={checked => setUniqueTracks(checked)}
                            checkedChildren="Evet"
                            unCheckedChildren="Hayır"
                            className="switch"
                        />
                    </Space>
                </TabPane>
            </Tabs>
        </div>
    );
}
