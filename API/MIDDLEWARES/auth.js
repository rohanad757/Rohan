import jwt from 'jsonwebtoken';

export const Authenticate = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized access', success: false });
        }
        const decoded = jwt.verify(token, "secretCode");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired', success: false });
        }
        console.log('Error authenticating user: ', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};