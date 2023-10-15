import {Router} from "express";
import recordController from "../controllers/recordController.js";
import adminController from '../controllers/admin-controller.js';
import bodyParser from 'body-parser';
import {body} from "express-validator";
import recordsUpd from "../database/database-update/records-upd.js";

const router = new Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// router.get('/', recordsUpd.checkAndUPDRecords);
router.get('/records', recordController.getAll);
router.get('/records/:id', recordController.getOne);
router.get('/records-all-dates/', recordController.getAllAvailableDates);
router.get('/record-free-dates/:date', recordController.getAvailableTimeList);
router.get('/records-first-date/', recordController.getFirstRecordDate);
router.get('/records-last-date/', recordController.getLastRecordDate);

router.get('/records-current/:date', recordController.getDateRecords);

router.post('/records/', recordController.create);
router.put('/change-record/', recordController.update);
router.delete('/record/:id', recordController.delete);

router.post('/login', adminController.login);
router.post('/registration',
    // body('username').isLength({min: 5, max: 15}),
    // body('password').isLength({min: 10, max: 32}),
    body('username'),
    body('password'),
    adminController.registration
);
router.post('/logout', adminController.logout);
router.get('/check-auth', adminController.checkToken);

export default router;