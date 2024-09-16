import { Input, Space, Typography, Tabs } from 'antd';
import React from 'react';
import * as Constants from '../utils/Constants';

const { Text, Title } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

interface Props {
    username?: string;
}

export default function MarkdownSnippet(props: Props): JSX.Element | null {
    const { username } = props;
    if (!username) {
        return null;
    }

    const svgSrc = ${Constants.BaseUrl}/api?user=${username};
    const markdownCode = ![Spotify Son Dinlenen Müzikler](${svgSrc});
    const customCount = ![Spotify Son Dinlenen Müzikler](${svgSrc}&count={muziksayisi});
    const customWidth = ![Spotify Son Dinlenen Müzikler](${svgSrc}&width={genislik});
    const uniqueTracks = ![Spotify Son Dinlenen Müzikler](${svgSrc}&unique=true);

    const htmlCode = <img src="${svgSrc}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />;
    const htmlCount = <img src="${svgSrc}&count={muziksayisi}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />;
    const htmlWidth = <img src="${svgSrc}&width={genişlik}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />;
    const htmlUniqueTracks = <img src="${svgSrc}&unique=true" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />;

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Markdown'a Nasıl Eklerim?" key="1">
                <Space className="vert-space" direction="vertical" size="small">
                    <Title level={5}>"{username}" olarak giriş yapıldı.</Title>
                    <Text>Varsayılan Markdown Kodu:</Text>
                    <TextArea className="markdown" autoSize readOnly value={markdownCode} />
                    <Text>
                        Listede bulunacak müzik sayısını ayarlamak için: (
                        <b>
                            {Constants.minCount} &#8804; &#123;Müzik Sayısı&#125; &#8804; {Constants.maxCount}
                        </b>
                        ):
                    </Text>
                    <TextArea className="markdown" autoSize readOnly value={customCount} />
                    <Text>
                        Listenin genişliğini ayarlamak için: (
                        <b>
                            {Constants.minWidth} &#8804; &#123;Liste Genişliği&#125; &#8804; {Constants.maxWidth}
                        </b>
                        ):
                    </Text>
                    <TextArea className="markdown" autoSize readOnly value={customWidth} />
                    <Text>Listede tekrar dinlenen müzikleri göstermek için:</Text>
                    <TextArea className="markdown" autoSize readOnly value={uniqueTracks} />
                    <object type="image/svg+xml" data={svgSrc}></object>
                </Space>
            </TabPane>
            <TabPane tab="HTML'e Nasıl Eklerim?" key="2">
                <Space className="vert-space" direction="vertical" size="small">
                    <Title level={5}>"{username}" olarak giriş yapıldı.</Title>
                    <Text>Varsayılan HTML Kodu:</Text>
                    <TextArea className="html" autoSize readOnly value={htmlCode} />
                    <Text>
                        Listede bulunacak müzik sayısını ayarlamak için: (
                        <b>
                            {Constants.minCount} &#8804; &#123;Müzik Sayısı&#125; &#8804; {Constants.maxCount}
                        </b>
                        ):
                    </Text>
                    <TextArea className="html" autoSize readOnly value={htmlCount} />
                    <Text>
                        Listenin genişliğini ayarlamak için: (
                        <b>
                            {Constants.minWidth} &#8804; &#123;Liste Genişliği&#125; &#8804; {Constants.maxWidth}
                        </b>
                        ):
                    </Text>
                    <TextArea className="html" autoSize readOnly value={htmlWidth} />
                    <Text>Listede tekrar dinlenen müzikleri göstermek için:</Text>
                    <TextArea className="html" autoSize readOnly value={htmlUniqueTracks} />
                    <object type="image/svg+xml" data={svgSrc}></object>
                </Space>
            </TabPane>
        </Tabs>
    );
}
