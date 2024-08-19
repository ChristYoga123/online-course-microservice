const apiAdapter = require('../../apiAdapter');
const {
    MEDIA_SERVICE_URL_DEV
} = process.env
const errorResponse = require('./../../../formatters/error')

const api = apiAdapter(MEDIA_SERVICE_URL_DEV);

module.exports = async(req, res) => {
    try {
        const media = await api.post('/media', req.body);
        return res.json(media.data);
    } catch (error) {
        console.log(error.code)
        if(error.code === 'FailedToOpenSocket') {
            return res.status(500).json(errorResponse(500, 'Media Service unavailable'));
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}