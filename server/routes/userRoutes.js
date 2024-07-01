import express from "express";
import {userLogin} from "../controllers/userControllers/userLogin.js";
import {userRegister} from "../controllers/userControllers/userRegister.js";
import {searchFlight} from "../controllers/userControllers/searchFlight.js";
import {bookFlight} from "../controllers/userControllers/bookFlight.js";
import {getBookings} from "../controllers/userControllers/getBookings.js";

const router = express.Router();

router.route("/user/register").post(userRegister);
router.route("/user/login").post(userLogin);
router.route("/user/searchFlight").post(searchFlight);
router.route("/user/bookFlight").post(bookFlight);
router.route("/user/getBookings").post(getBookings);

export default router;