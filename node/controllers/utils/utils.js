const createErrorMessage = (res, message, tilausrivit) => {
    res.statusCode = 400;
    if ( tilausrivit)
        res.json({status : "NOT OK", message: message, tilausrivit})
    else 
        res.json({status : "NOT OK", message: message})
}

module.exports = {
    createErrorMessage
}