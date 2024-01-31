import express from 'express';
import cors from 'cors';
import prisma from './prisma.js';
import * as authController from "./controllers/authController.js";
import {authenticateToken} from "./controllers/authController.js";
import * as userController from "./controllers/userController.js";
import * as messageController from "./controllers/messageController.js";
import * as miscController from "./controllers/miscController.js";
import * as realEstateController from "./controllers/realEstateController.js";

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

try {
    app.get('/users', authenticateToken, async (req, res) => {
        const users = await prisma.user.findMany();
        res.json(users);
    })
} catch (error) {
    console.log(error);
}

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
})


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
})


