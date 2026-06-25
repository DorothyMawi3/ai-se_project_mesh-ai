import { useEffect, useState } from 'react';
import './KnowledgeBase.css';
import UploadArea from '../../components/UploadArea/UploadArea';
import { getDocuments } from '../../utils/api';
import type { KnowledgeDoc } from '../../utils/api';

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDocuments();
        setDocuments(res.data || []);
      } catch {
        setError('Failed to load documents.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleFileSelect = (file: File) => {
    const newDoc: KnowledgeDoc = {
      _id: Date.now().toString(),
      title: file.name,
      fileName: file.name,
      userId: 'local',
      createdAt: new Date().toISOString(),
    };

    setDocuments((currentDocuments) => [newDoc, ...currentDocuments]);
  };

  return (
    <div className="knowledge-base">
      <h1>Manage Your Knowledge Base</h1>

      <section className="knowledge-base__content">
        <p>Upload documents (PDF)</p>

        <UploadArea onFileSelect={handleFileSelect} />

        <div className="knowledge-base__library">
          {isLoading && (
            <p className="knowledge-base__message">Loading documents...</p>
          )}

          {!isLoading && error && (
            <p className="knowledge-base__message knowledge-base__message_error">
              {error}
            </p>
          )}

          {!isLoading && !error && documents.length === 0 && (
            <p className="knowledge-base__message">No documents yet.</p>
          )}

          {!isLoading && !error && documents.length > 0 && (
            <ul className="knowledge-base__list">
              {documents.map((doc) => (
                <li className="knowledge-base__item" key={doc._id}>
                  <span className="knowledge-base__file-name">
                    {doc.fileName}
                  </span>
                  <button
                    className="knowledge-base__delete"
                    type="button"
                    aria-label={`Delete ${doc.fileName}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="knowledge-base__save" type="button">
          Save
        </button>
      </section>
    </div>
  );
}
