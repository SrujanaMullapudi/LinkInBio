import express from 'express';
import { postSocialLinks, getSocialLinks, deleteSocialLinks } from "../Controllers/getSocialLinksControllers.js"
const router = express.Router();

router.get('/:uid', getSocialLinks);
router.post('/:uid', postSocialLinks);
router.post('/deleteSocialLink/:uid', deleteSocialLinks);

export default router;
