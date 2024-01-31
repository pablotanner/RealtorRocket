import prisma from '../prisma.js';

export async function createDocument(req, res) {
    try {
        const {documentType, documentName, documentUrl, realEstateObjectId, rentalId} = req.body;

        const userId = req.user.userId;

        let data = {
            documentType: documentType,
            documentName: documentName,
            documentUrl: documentUrl,
            user: {
                connect: {
                    id: userId,
                }
            },
            // Conditionally add fields if they exist
            ...(realEstateObjectId && {
                realEstateObject: {
                    connect: {
                        id: realEstateObjectId,
                    }
                }
            }),
            ...(rentalId && {
                rental: {
                    connect: {
                        id: rentalId,
                    }
                }
            })
        };

        const newDocument = await prisma.document.create({
            data: data,
        })


        res.status(200).json({data: newDocument });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating document" });
    }
}

export async function setCurrency(req, res) {
    try {
        const {currency} = req.body;

        const userId = req.user.userId;

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                currencyCode: currency,
            },
        });

        res.status(200).json({data: updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Error setting currency" });
    }
}
