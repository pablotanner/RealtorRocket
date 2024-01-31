import prisma from '../prisma.js';


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
        res.status(500).json({ message: "Error creating message" });
    }
}

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

        });

        // return sent and received messages in separate objects
        const sentMessages = messages.filter(message => message.senderId === req.user.userId);
        const receivedMessages = messages.filter(message => message.receiverId === req.user.userId);

        res.status(200).json({data: {sent: sentMessages, received: receivedMessages} });

    }
    catch (error) {
        res.status(500).json({ message: "Error getting messages" });
    }
}