const axios = require('axios');

module.exports = (baseURL) => {
    return axios.create({
        baseURL: baseURL,
        timeout: parseInt(process.env.SERVICE_TIMEOUT),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};