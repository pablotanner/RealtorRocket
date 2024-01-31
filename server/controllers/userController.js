import prisma from '../prisma.js';


export async function getUser(req, res) {
    // Find user using the id from the JWT
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId,
            },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }

        res.status(200).json({data: user });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting user" });
    }

}

export async function updateUser(req, res) {
    // Find user using the id from the JWT
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId,
            },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: req.user.userId,
            },
            data: {
                ...req.body,
            },
        });

        res.status(200).json({data: updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
}

export async function deleteUser(req, res) {
    // Find user using the id from the JWT
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId,
            },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }

        await prisma.user.delete({
            where: {
                id: req.user.userId,
            },
        });

        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
}