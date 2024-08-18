module.exports = (code, message, data = null) => {
    return {
        meta: {
            code: code,
            status: 'success',
            message: message
        },
        data: data
    }
} 