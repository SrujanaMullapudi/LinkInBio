import express from 'express';
import { postLinks,getLinks } from '../Controllers/getLinks.js';
const router = express.Router();

router.get('/:uid', getLinks);
router.post('/:uid',postLinks);

export default router;
