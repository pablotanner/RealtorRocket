import express from 'express';
import cors from 'cors';
import prisma from './prisma.js';
import * as authController from "./controllers/authController.js";
import {authenticateToken} from "./controllers/authController.js";

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/refresh', authController.refresh);




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


