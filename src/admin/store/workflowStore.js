import { create } from 'zustand';
import { WORKFLOW_STAGES, canAdvanceTo, validateTransition } from '../config/workflow';

const useWorkflowStore = create((set, get) => ({
  // Current user being viewed
  currentUserId: null,
  currentUserStatus: null,
  
  // Workflow history for current user
  workflowHistory: [],
  
  // Loading states
  isLoading: false,
  isTransitioning: false,
  
  // Error state
  error: null,
  
  // Actions
  setCurrentUser: (userId, status) => {
    set({
      currentUserId: userId,
      currentUserStatus: status,
      error: null,
    });
  },
  
  setWorkflowHistory: (history) => {
    set({ workflowHistory: history });
  },
  
  // Validate if transition is allowed
  canTransitionTo: (targetStatus) => {
    const { currentUserStatus } = get();
    if (!currentUserStatus) return false;
    return canAdvanceTo(currentUserStatus, targetStatus);
  },
  
  // Get allowed next stages
  getNextStages: () => {
    const { currentUserStatus } = get();
    if (!currentUserStatus) return [];
    return WORKFLOW_STAGES[currentUserStatus]?.next || [];
  },
  
  // Get stage info
  getStageInfo: (status) => {
    return WORKFLOW_STAGES[status] || null;
  },
  
  // Advance workflow (API call would go here)
  advanceWorkflow: async (targetStatus, notes = '') => {
    const { currentUserStatus, currentUserId } = get();
    
    // Validate transition
    const validation = validateTransition(currentUserStatus, targetStatus);
    if (!validation.valid) {
      set({ error: validation.message });
      return { success: false, message: validation.message };
    }
    
    set({ isTransitioning: true, error: null });
    
    try {
      // API call would go here
      // await api.workflow.advance(currentUserId, targetStatus, notes);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Update local state
      set((state) => ({
        currentUserStatus: targetStatus,
        workflowHistory: [
          {
            id: Date.now(),
            fromStatus: currentUserStatus,
            toStatus: targetStatus,
            notes,
            createdAt: new Date().toISOString(),
            isOverride: false,
          },
          ...state.workflowHistory,
        ],
        isTransitioning: false,
      }));
      
      return { success: true };
    } catch (error) {
      set({ 
        error: error.message || 'Failed to advance workflow',
        isTransitioning: false,
      });
      return { success: false, message: error.message };
    }
  },
  
  // Override workflow (admin only)
  overrideWorkflow: async (targetStatus, reason) => {
    const { currentUserStatus, currentUserId } = get();
    
    if (!reason?.trim()) {
      set({ error: 'Override reason is required' });
      return { success: false, message: 'Override reason is required' };
    }
    
    set({ isTransitioning: true, error: null });
    
    try {
      // API call would go here
      // await api.workflow.override(currentUserId, targetStatus, reason);
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      set((state) => ({
        currentUserStatus: targetStatus,
        workflowHistory: [
          {
            id: Date.now(),
            fromStatus: currentUserStatus,
            toStatus: targetStatus,
            notes: `[OVERRIDE] ${reason}`,
            createdAt: new Date().toISOString(),
            isOverride: true,
          },
          ...state.workflowHistory,
        ],
        isTransitioning: false,
      }));
      
      return { success: true };
    } catch (error) {
      set({ 
        error: error.message || 'Failed to override workflow',
        isTransitioning: false,
      });
      return { success: false, message: error.message };
    }
  },
  
  // Clear error
  clearError: () => set({ error: null }),
  
  // Reset store
  reset: () => set({
    currentUserId: null,
    currentUserStatus: null,
    workflowHistory: [],
    isLoading: false,
    isTransitioning: false,
    error: null,
  }),
}));

export default useWorkflowStore;

