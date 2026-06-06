import { Router } from 'express';
import {
  deleteDocument,
  getDocumentById,
  getDocuments,
  uploadDocument,
} from '../controllers/documents.js';

const documentsRouter = Router();

documentsRouter.post('/', uploadDocument);
documentsRouter.get('/', getDocuments);
documentsRouter.get('/:id', getDocumentById);
documentsRouter.delete('/:id', deleteDocument);

export { documentsRouter };
