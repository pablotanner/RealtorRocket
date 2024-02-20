import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import prisma from './prisma.js';
import * as authController from "./controllers/authController.js";
import {authenticateToken} from "./controllers/authController.js";
import * as userController from "./controllers/userController.js";
import * as messageController from "./controllers/messageController.js";
import * as miscController from "./controllers/miscController.js";
import * as realEstateController from "./controllers/realEstateController.js";
import * as leaseController from "./controllers/leaseController.js";
import * as tenantController from "./controllers/tenantController.js";
import {checkOverduePayments} from "./jobs/overduePayments.js";
import * as paymentController from "./controllers/paymentController.js";

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Auth
router.post('/signup', authController.createRealtor);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

// User
router.get('/user', authenticateToken, userController.getUser)
router.patch('/user', authenticateToken, userController.updateUser)
router.delete('/user', authenticateToken, userController.deleteUser)

// Messages
router.get('/messages', authenticateToken, messageController.getMessages)
router.post('/messages', authenticateToken, messageController.createMessage)

// Misc
router.post('/currency', authenticateToken, miscController.setCurrency)


// Properties
router.get('/properties', authenticateToken, realEstateController.getProperties)
router.post('/properties', authenticateToken, realEstateController.createProperty)
router.get('/properties/:id', authenticateToken, realEstateController.getProperty)
router.delete('/properties/:id', authenticateToken, realEstateController.deleteProperty)

// Units / Rentals
router.get('/units', authenticateToken, realEstateController.getUnits)
router.get('/units/:id', authenticateToken, realEstateController.getUnit)

// Leases
router.get('/leases', authenticateToken, leaseController.getLeases)
router.get('/leases/:id', authenticateToken, leaseController.getLease)
router.post('/leases', authenticateToken, leaseController.createLease)

// Tenants
router.get('/tenants', authenticateToken, tenantController.getTenants)
router.post('/tenants', authenticateToken, tenantController.createTenant)
router.get('/tenants/:id', authenticateToken, tenantController.getTenant)
router.delete('/tenants/:id', authenticateToken, tenantController.deleteTenant)
router.put('/tenants/:id', authenticateToken, tenantController.updateTenant)

// Payments
router.post('/payments', authenticateToken, paymentController.createPayment)
router.get('/payments', authenticateToken, paymentController.getPayments)


//Jobs
//      Schedule the job to run daily at 00:00 (midnight)
cron.schedule('0 0 * * *', checkOverduePayments);


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
})


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
})


