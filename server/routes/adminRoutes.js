import express from "express";
import {adminLogin} from "../controllers/adminControllers/adminLogin.js";
import {addFlight} from "../controllers/adminControllers/addFlight.js";
import {viewBookings} from "../controllers/adminControllers/viewBookings.js";

const router = express.Router();

router.route("/admin/login").post(adminLogin);
router.route("/admin/addFlight").post(addFlight);
router.route("/admin/viewBookings").post(viewBookings);

export default router;