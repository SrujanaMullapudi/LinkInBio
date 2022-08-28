import express from 'express';
import { postLinks,getLinks, checkUsernameAvailable,publicViewing, deleteLink, getEditLink, editLink } from '../Controllers/getLinksControllers.js';
const router = express.Router();

router.get('/:uid', getLinks); // /links/:uid
router.get('/Edit/:uid/:linkId',getEditLink);
router.post('/Edit/:uid/:linkId',editLink)
router.get('/public/:username',publicViewing) // /links/public/:username
router.post('/checkusername',checkUsernameAvailable);
router.post('/deleteLink/:uid/:idx',deleteLink);
router.post('/:uid',postLinks);

export default router;
