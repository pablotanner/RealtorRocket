import bcrypt from 'bcryptjs';
import prisma from '../prisma.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();



export async function signup(req, res) {
    const {email, password} = req.body;
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                salt: salt,
            },
        });
        res.status(201).json({message: 'User created successfully', user: newUser});
    }

    catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // eslint-disable-next-line no-undef
        const accessToken = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });

        // eslint-disable-next-line no-undef
        const refreshToken = jwt.sign({ userId: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

        res.status(200).json({ message: "Login successful", accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
}

export async function refresh(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ error: "Refresh token is required" });
    }

    try {
        // Verify the refresh token
        // eslint-disable-next-line no-undef
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId,
            },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid user" });
        }

        // Generate new access token and refresh token
        // eslint-disable-next-line no-undef
        const newAccessToken = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
        // eslint-disable-next-line no-undef
        const newRefreshToken = jwt.sign({ userId: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

        res.status(200).json({ message: "Refresh successful", accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        res.status(500).json({ error: "Error refreshing token" });
    }
}


