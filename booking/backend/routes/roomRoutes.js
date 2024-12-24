import express from "express";
import { getRooms, updateRoom } from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getRooms);
router.put("/:roomId", updateRoom);

export default router;
