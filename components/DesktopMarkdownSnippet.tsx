 import { Input, Space, Typography } from 'antd';
import React from 'react';
import * as Constants from '../utils/Constants';

const { Text, Title } = Typography;
const { TextArea } = Input;

interface Props {
    username?: string;
}

export function DesktopMarkdownSnippet(props: Props): JSX.Element | null {
    const { username } = props;
    if (!username) {
        return null;
    }

    const svgSrc = `${Constants.BaseUrl}/api?user=${username}`;
    const markdownCode = `![Alt text](${svgSrc})`;
    const customCount = `![Alt text](${svgSrc}&count={count})`;
    const customWidth = `![Alt text](${svgSrc}&width={width})`;
    const uniqueTracks = `![Alt text](${svgSrc}&unique={true|1|on|yes})`;

    return (
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
    );
}
