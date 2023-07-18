const errorhandler = (err, req, res, next) => {
    console.log("middleware/errorhandler.js");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    console.log(errMsg)
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

module.exports = errorhandler