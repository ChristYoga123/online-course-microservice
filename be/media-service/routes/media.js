const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const { error, success } = require('../formatters');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

router.post('/', (req, res) => {
    const image = req.body.image;
    // check if the image is base64
    if (!isBase64(image, {mimeRequired: true})) {
        return res.status(400).json(error(400, 'Image must be base64'));
    }

    // upload image into db and save it into public/images
    base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
        if(err) {
            return res.status(500).json(error(500, err.message));
        }
        
        const filename = filepath.split('\\').pop().split('/').pop();
        
        const media = await prisma.media.create({
            data: {
                image: `images/${filename}`
            }
        })

        return res.json(success(201, 'Image uploaded successfully', `${req.get('host')}/images/${filename}`));
    });
});

router.get('/', async (req, res) => {
    const media = await prisma.media.findMany();
    const mappedMedia = media.map(m => {
        m.image = `${req.get('host')}/${m.image}`;
        return m;
    });
    return res.json(success(200, 'Success', mappedMedia));
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const media = await prisma.media.findFirst({
        where: {
            id: id
        }
    });
    if(!media) {
        return res.status(404).json(error(404, 'Media not found'));
    }
    // unlink image from public/images
    fs.unlink(`./public/${media.image}`, async (err) => {
        if(err) {
            return res.status(500).json(error(500, err.message));
        }
    });

    await prisma.media.delete({
        where: {
            id: id
        }
    });

    return res.json(success(200, 'Image deleted successfully', media));
});
module.exports = router;
