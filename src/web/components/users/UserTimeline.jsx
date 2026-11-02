import Timeline from '../common/Timeline';
import Card from '../common/Card';

const UserTimeline = ({ history = [] }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Workflow History</Card.Title>
        <Card.Description>
          Complete timeline of status changes for this user
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Timeline
          items={history}
          emptyMessage="No workflow history available"
        />
      </Card.Content>
    </Card>
  );
};

export default UserTimeline;

