import { clsx } from 'clsx';
import { WORKFLOW_STAGES } from '../../config/workflow';
import Badge from './Badge';

const StatusBadge = ({ status, showDot = true, size = 'md' }) => {
  const stageInfo = WORKFLOW_STAGES[status];
  
  if (!stageInfo) {
    return (
      <Badge color="gray" size={size} dot={showDot}>
        Unknown
      </Badge>
    );
  }
  
  return (
    <Badge color={stageInfo.color} size={size} dot={showDot}>
      {stageInfo.label}
    </Badge>
  );
};

export default StatusBadge;

