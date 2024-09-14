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

    const svgSrc = `${Constants.BaseUrl}/api?user=${username}`;
    const markdownCode = `![Spotify Son Dinlenen Müzikler](${svgSrc})`;
    const customCount = `![Spotify Son Dinlenen Müzikler](${svgSrc}&count={count})`;
    const customWidth = `![Spotify Son Dinlenen Müzikler](${svgSrc}&width={width})`;
    const uniqueTracks = `![Spotify Son Dinlenen Müzikler](${svgSrc}&unique={true|1|on|yes})`;

    const htmlCode = `<img src="${svgSrc}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />`;
    const htmlCount = `<img src="${svgSrc}&count={count}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />`;
    const htmlWidth = `<img src="${svgSrc}&width={width}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />`;
    const htmlUniqueTracks = `<img src="${svgSrc}&unique={true|1|on|yes}" alt="Spotify Son Dinlenen Müzikler - Mustafa Arda Düşova" />`;

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Markdown" key="1">
                <Space className="vert-space" direction="vertical" size="small">
                    <Title level={5}>{username} olarak giriş yapıldı.</Title>
                    <Text>Markdown kod parçacığı:</Text>
                    <TextArea className="markdown" autoSize readOnly value={markdownCode} />
                    <Text>
                        Özel sayı için (
                        <b>
                            {Constants.minCount} &#8804; &#123;Sayı&#125; &#8804; {Constants.maxCount}
                        </b>
                        ):
                    </Text>
                    <TextArea className="markdown" autoSize readOnly value={customCount} />
                    <Text>
                        Özel genişlik için (
                        <b>
                            {Constants.minWidth} &#8804; &#123;Genişlik&#125; &#8804; {Constants.maxWidth}
                        </b>
                        ):
                    </Text>
                    <TextArea className="markdown" autoSize readOnly value={customWidth} />
                    <Text>Benzersiz parçalar için:</Text>
                    <TextArea className="markdown" autoSize readOnly value={uniqueTracks} />
                    <object type="image/svg+xml" data={svgSrc}></object>
                </Space>
            </TabPane>
            <TabPane tab="HTML" key="2">
                <Space className="vert-space" direction="vertical" size="small">
                    <Title level={5}>{username} olarak giriş yapıldı.</Title>
                    <Text>HTML kod parçacığı:</Text>
                    <TextArea className="html" autoSize readOnly value={htmlCode} />
                    <Text>
                        Özel sayı için (
                        <b>
                            {Constants.minCount} &#8804; &#123;Sayı&#125; &#8804; {Constants.maxCount}
                        </b>
                        ):
                    </Text>
                    <TextArea className="html" autoSize readOnly value={htmlCount} />
                    <Text>
                        Özel genişlik için (
                        <b>
                            {Constants.minWidth} &#8804; &#123;Genişlik&#125; &#8804; {Constants.maxWidth}
                        </b>
                        ):
                    </Text>
                    <TextArea className="html" autoSize readOnly value={htmlWidth} />
                    <Text>Benzersiz parçalar için:</Text>
                    <TextArea className="html" autoSize readOnly value={htmlUniqueTracks} />
                    <object type="image/svg+xml" data={svgSrc}></object>
                </Space>
            </TabPane>
        </Tabs>
    );
}
