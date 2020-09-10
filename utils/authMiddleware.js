const authMiddleware = (req, res, next) => {
    if ( req.isAuthenticated() ) {
        next()
    } else {
        res.status(401).json({ success: false, message:"You don't have permission to perform this action!"})
    }
}

module.exports = authMiddleware