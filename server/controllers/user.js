import UserValidator from '../core/UserValidator.js';
import UserModel from '../models/User.js';

export default {
    onGetAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getUsers();
            return res.status(200).json({ success: true, data: users });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    onGetUserById: async (req, res) => {
        try {
            const user = await UserModel.getUserById(req.params.id);
            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    onCreateUser: async (req, res) => {
        try {
            const { displayName, email } = req.body;
            const user = { displayName, email };

            const { isValid, errors } = UserValidator.validate(user);
            if (!isValid) {
                return res.status(400).json({
                    success: isValid,
                    errorMessage: "Kindly correct the error(s)",
                    errors,
                });
            }
            
            const validatedUser = await UserModel.createUser(displayName, email);

            return res.status(200).json({ success: true, data: validatedUser });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    onDeleteUserById: async (req, res) => {
        
        try {
            const user = await UserModel.deleteUserById(req.params.id);

            return res.status(200).json({
                success: true,
                message: `Deleted a count of ${user.deletedCount} user.`
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error, message: error.message });
        }
    }
}