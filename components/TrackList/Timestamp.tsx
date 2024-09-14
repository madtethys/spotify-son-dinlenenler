import { Typography } from 'antd';
import { DateTime } from 'luxon';

const { Text } = Typography;

interface Props {
  
    isoDate: string;
}


export default function Timestamp(props: Props): JSX.Element {
    const { isoDate } = props;


    const timestampText =
        DateTime.fromISO(isoDate, {
            zone: 'utc',
            locale: 'tr',
        }).toRelative({
            style: 'long',
        }) ?? '';

    const timestampTitle = isoDate;

    return (
        <>
            <Text className="timestamp" type="secondary" title={timestampTitle}>
                {timestampText}
            </Text>
        </>
    );
}
