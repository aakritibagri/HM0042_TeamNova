const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; 
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;
