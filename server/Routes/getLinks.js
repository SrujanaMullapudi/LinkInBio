import express from 'express';
import { postLinks,getLinks, checkUsernameAvailable } from '../Controllers/getLinks.js';
const router = express.Router();

router.get('/:uid', getLinks);
router.post('/checkusername',checkUsernameAvailable);
router.post('/:uid',postLinks);

export default router;
