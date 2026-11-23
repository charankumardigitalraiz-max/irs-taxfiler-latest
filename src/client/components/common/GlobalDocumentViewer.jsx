import React from 'react';
import DocumentViewerModal from './DocumentViewerModal';
import { useDocumentViewerStore } from '../../hooks/useDocumentViewer';

/**
 * Global Document Viewer component that renders once in DashboardLayout
 * and can be triggered anywhere in the app via useDocumentViewer()
 */
export const GlobalDocumentViewer = () => {
  const isOpen = useDocumentViewerStore((state) => state.isOpen);
  const document = useDocumentViewerStore((state) => state.document);
  const closeDocument = useDocumentViewerStore((state) => state.closeDocument);

  if (!isOpen || !document) return null;

  return (
    <DocumentViewerModal
      isOpen={isOpen}
      onClose={closeDocument}
      file={document}
    />
  );
};

export default GlobalDocumentViewer;
