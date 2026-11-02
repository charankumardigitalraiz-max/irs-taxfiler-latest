import { useCallback } from 'react';
import useWorkflowStore from '../store/workflowStore';
import { WORKFLOW_STAGES, getProgress, isFinalStage } from '../config/workflow';

export const useWorkflow = () => {
  const store = useWorkflowStore();
  
  const initializeUser = useCallback((userId, status, history = []) => {
    store.setCurrentUser(userId, status);
    store.setWorkflowHistory(history);
  }, [store]);
  
  const advanceToNextStage = useCallback(async (targetStatus, notes) => {
    return await store.advanceWorkflow(targetStatus, notes);
  }, [store]);
  
  const overrideStatus = useCallback(async (targetStatus, reason) => {
    return await store.overrideWorkflow(targetStatus, reason);
  }, [store]);
  
  const getCurrentStageInfo = useCallback(() => {
    if (!store.currentUserStatus) return null;
    return WORKFLOW_STAGES[store.currentUserStatus];
  }, [store.currentUserStatus]);
  
  const getProgressPercentage = useCallback(() => {
    if (!store.currentUserStatus) return 0;
    return getProgress(store.currentUserStatus);
  }, [store.currentUserStatus]);
  
  const isCompleted = useCallback(() => {
    if (!store.currentUserStatus) return false;
    return isFinalStage(store.currentUserStatus);
  }, [store.currentUserStatus]);
  
  const getAvailableNextStages = useCallback(() => {
    return store.getNextStages().map((key) => ({
      key,
      ...WORKFLOW_STAGES[key],
    }));
  }, [store]);
  
  return {
    currentUserId: store.currentUserId,
    currentStatus: store.currentUserStatus,
    workflowHistory: store.workflowHistory,
    isLoading: store.isLoading,
    isTransitioning: store.isTransitioning,
    error: store.error,
    
    initializeUser,
    advanceToNextStage,
    overrideStatus,
    getCurrentStageInfo,
    getProgressPercentage,
    isCompleted,
    getAvailableNextStages,
    canTransitionTo: store.canTransitionTo,
    clearError: store.clearError,
    reset: store.reset,
  };
};

export default useWorkflow;

