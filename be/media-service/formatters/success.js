module.exports = (code, message, data) => {
    return {
        meta: {
            code: code,
            status: 'success',
            message: message
        },
        data: data
    }
} 