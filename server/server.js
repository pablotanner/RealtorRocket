import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('App listening on port 3000!');

})


