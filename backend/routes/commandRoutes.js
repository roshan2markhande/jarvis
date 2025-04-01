import { Router } from 'express';
const router = Router();
import { executeCommand } from '../controllers/commandController.js';

router.post('/api/execute-command', executeCommand);

export default router;
