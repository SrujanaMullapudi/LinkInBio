import express from 'express';
import { postSocialLinks, getSocialLinks } from "../Controllers/getSocialLinksControllers.js"
const router = express.Router();

router.get('/:uid', getSocialLinks);
router.post('/:uid', postSocialLinks);

export default router;
