const axios = require('axios');

module.exports = (baseURL) => {
    return axios.create({
        baseURL: baseURL,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};