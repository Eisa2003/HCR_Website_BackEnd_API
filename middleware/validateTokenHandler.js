const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            token = authHeader.split(" ")[1]; // Split the whole token in 2 -> An array with two elements. 
                                              // and then we choose the 2nd element
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.admin = decoded.admin;
            next(); // Calling next ensures that the work of this middleware is complete
                    // and it can proceed to the next middleware
        } catch (err) {
            console.error("Error verifying token:", err);
            res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        res.status(401).json({ message: "No token provided" });
    }
});


module.exports = validateToken;