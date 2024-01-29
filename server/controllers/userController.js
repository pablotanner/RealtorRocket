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