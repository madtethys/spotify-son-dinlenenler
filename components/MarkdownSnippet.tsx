import { Input, Space, Typography, Tabs, Select, Slider, Switch } from 'antd';
import React, { useState } from 'react';
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

    if (!username) {
        return null;
    }

    const svgSrc = `${Constants.BaseUrl}/api?user=${username}`;
    const updateParams = `&count=${trackCount}&width=${width}${uniqueTracks ? '&unique=true' : ''}`;
    const markdownCode = `![Spotify Son Dinlenen Müzikler](${svgSrc}${updateParams})`;
    const htmlCode = `<img src="${svgSrc}${updateParams}" alt="Spotify Son Dinlenen Müzikler - ${username}" />`;

    const handleTrackCountChange = (value: string) => {
        setTrackCount(parseInt(value, 10));
    };

    const handleWidthChange = (value: number | [number, number]) => {
        if (typeof value === 'number') {
            setWidth(value);
        }
    };

    const textColor = theme === 'dark' ? '#d0d0d0' : '#222222';
    const backgroundColor = theme === 'dark' ? '#2e2e2e' : '#f9f9f9';

    return (
        <div>
            <Title level={5} style={{ color: textColor, marginBottom: '20px' }}>
                "{username}" olarak giriş yapıldı.
            </Title>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Markdown'a Nasıl Eklerim?" key="1">
                    <Space className="vert-space" direction="vertical" size="small">
                        <Text style={{ color: textColor }}>Varsayılan Markdown Kodu:</Text>
                        <TextArea
                            className="markdown"
                            autoSize
                            readOnly
                            value={markdownCode}
                            style={{ backgroundColor, color: textColor }}
                        />
                        <Title level={5} style={{ color: textColor }}>
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
                        <Text style={{ color: textColor }}>Varsayılan HTML Kodu:</Text>
                        <TextArea
                            className="htmlkodu"
                            autoSize
                            readOnly
                            value={htmlCode}
                            style={{ backgroundColor, color: textColor }}
                        />
                        <Title level={5} style={{ color: textColor }}>
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
                        <Title level={5} style={{ color: textColor }}>
                            Ayarları Yapılandırın
                        </Title>
                        <Text style={{ color: textColor }}>Listede bulunacak müzik sayısını ayarlayın:</Text>
                        <Select
                            value={trackCount.toString()}
                            onChange={handleTrackCountChange}
                            style={{ width: '100%' }}
                        >
                            {[...Array(10).keys()].map(i => (
                                <Option key={i + 1} value={(i + 1).toString()}>
                                    {i + 1}
                                </Option>
                            ))}
                        </Select>
                        <Text style={{ color: textColor }}>Listenin genişliğini ayarlayın (px):</Text>
                        <Slider
                            min={300}
                            max={1000}
                            step={1}
                            value={width}
                            onChange={handleWidthChange}
                            tooltip={{
                                formatter: (value) => `${value}px`,
                            }}
                            className="slider" // CSS sınıfını ekleyin
                        />
                        <Text style={{ color: textColor }}>Listede tekrar dinlenen müzikleri göster:</Text>
                        <Switch
                            checked={uniqueTracks}
                            onChange={setUniqueTracks}
                            className="switch" // CSS sınıfını ekleyin
                            checkedChildren="Evet"
                            unCheckedChildren="Hayır"
                        />
                    </Space>
                </TabPane>
            </Tabs>
        </div>
    );
}
