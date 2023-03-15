import jwt from 'jsonwebtoken';
// models
import UserModel from '../models/User.js';

const SECRET_KEY = 'changeable-this!'; // This is the secret key that we will use to encode and decode the token.

export const encode = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.getUserById(userId);
        const payload = {
            userId: user._id,
        };
        const authToken = jwt.sign(payload, SECRET_KEY);
        req.authToken = authToken;
        next(); // This is important. We need to call next() to move to the next middleware.
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const decode = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({
            success: false,
            message: 'No token provided',
        });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const payload = jwt.verify(accessToken, SECRET_KEY);
        req.userId = payload.userId;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};
