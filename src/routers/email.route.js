import { Router } from "express";
import { getEmails } from '../controllers/email.controller.js';
const router = Router();

router.get('/emails/', getEmails);

export default router;
