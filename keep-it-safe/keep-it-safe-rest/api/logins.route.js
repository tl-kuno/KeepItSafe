import express from "express"
import LoginsCtrl from "./logins.controller.js"


const router = express.Router()

router.route("/").get(LoginsCtrl.apiGetLogins)
router.route("/id/:id").get(LoginsCtrl.apiGetLoginById)
router.route("/websiteNames").get(LoginsCtrl.apiGetWebsiteNames)


router
    .route("/login")
    .post(LoginsCtrl.apiPostLogin)
    .put(LoginsCtrl.apiUpdateLogin)
    .delete(LoginsCtrl.apiDeleteLogin)

router.route("/search").post(LoginsCtrl.apiSearchCorrect)

export default router