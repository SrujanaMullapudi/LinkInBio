import express from 'express';
import { postLinks,getLinks, checkUsernameAvailable,publicViewing, deleteLink } from '../Controllers/getLinks.js';
const router = express.Router();

router.get('/:uid', getLinks);
router.get('/public/:username',publicViewing)
router.post('/checkusername',checkUsernameAvailable);
router.post('/deleteLink/:uid/:idx',deleteLink);
router.post('/:uid',postLinks);

export default router;
