import { List } from 'antd';
import { PlayHistory } from '../../models/PlayHistory';
import TrackListHeader from './TrackListHeader';
import TrackListItem from './TrackListItem';

interface Props {

    playHistoryList: PlayHistory[];

    username: string;
}


export default function TrackList(props: Props): JSX.Element {
    const { playHistoryList, username } = props;
    return (
        <List
            size="small"
            header={<TrackListHeader username={username} />}
            bordered
            dataSource={playHistoryList}
            renderItem={(playHistory) => <TrackListItem playHistory={playHistory} />}
        />
    );
}
