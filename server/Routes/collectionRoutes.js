import express from "express";
import { getAllCollections, postCollections, AddCollectionLink } from "../Controllers/collectionsControllers.js";
const router = express.Router();



router.get("/getAllCollections/:uid",getAllCollections);
router.post("/newCollection",postCollections);
router.post("/addLink/:collectionName",AddCollectionLink);

export default router;