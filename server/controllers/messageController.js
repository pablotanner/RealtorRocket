import prisma from '../prisma.js';

export async function createMessage(message) {
    try {
        const newMessage = await prisma.message.create({
            data: {
                type: message.type,
                content: message.content,
                sender: {
                    connect: {
                        id: message.senderId,
                    }
                },
                receiver: {
                    connect: {
                        id: message.receiverId,
                    }
                }
            },
            include: {
                sender: true,
                receiver: true,
            }
        });

        return newMessage;
    }
    catch (error) {
        console.log(error)
        return null;
    }
}

/*


export async function createMessage(req, res) {
    try {
        const {senderId, receiverId, content, subject} = req.body;

        const newMessage = await prisma.message.create({
            data: {
                subject: subject,
                content: content,
                sender: {
                    connect: {
                        id: senderId,
                    }
                },
                receiver: {
                    connect: {
                        id: receiverId,
                    }
                }
            },
        });

        res.status(200).json({data: newMessage });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating message" });
    }
}
 */


export async function getMessages(req, res) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: req.user.userId,
                    },
                    {
                        receiverId: req.user.userId,
                    }
                ]
            },
            include: {
                sender: true,
                receiver: true,
            }

        });

        res.status(200).json({data: messages });

    }
    catch (error) {
        res.status(500).json({ message: "Error getting messages" });
    }
}