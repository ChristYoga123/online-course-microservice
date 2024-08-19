module.exports = (code, message) => {
    return {
        meta: {
            code: code,
            status: 'error',
            message: message
        },
        data: null
    }
}