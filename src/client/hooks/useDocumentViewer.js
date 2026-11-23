import { create } from 'zustand';

export const useDocumentViewerStore = create((set) => ({
  isOpen: false,
  document: null,
  openDocument: (doc) => set({ isOpen: true, document: doc }),
  closeDocument: () => set({ isOpen: false, document: null }),
}));

export const useDocumentViewer = () => {
  const isOpen = useDocumentViewerStore((state) => state.isOpen);
  const document = useDocumentViewerStore((state) => state.document);
  const openDocument = useDocumentViewerStore((state) => state.openDocument);
  const closeDocument = useDocumentViewerStore((state) => state.closeDocument);

  return {
    isOpen,
    document,
    viewDocument: openDocument,
    openDocument,
    closeDocument,
  };
};

export default useDocumentViewer;
