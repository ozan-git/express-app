const UserValidator = require('../server/userValidator');

const userController = {
    getAll: (req, res, next) => {
        return res.status(200).json({ success: true, message: 'Hello World' });
    },
    getById: (req, res, next) => {
        const { id } = req.params;
        return res.status(200).json({ success: true, message: 'Hello World with id ' + id });
    },
    createUser: (req, res, next) => {
        const { firstName, lastName, email, userType } = req.body;

        const user = { firstName, lastName, email, userType };

        const { isValid, errors } = UserValidator.validate(user);

        if (!isValid) {
            return res.status(400).json({
                success: isValid,
                errorMessage: "Kindly correct the error(s)",
                errors,
            });
        }

        const userPayload = {
            firstName,
            lastName,
            email,
            userType,
        };

        return res.status(200).json({
            success: true,
            message: "Hello World with id but now not",
            data: userPayload,
        });
    },
    updateUser: (req, res, next) => {
        const { id } = req.params;
        const { firstName, lastName } = req.body;

        const userPayload = {
            id,
            firstName,
            lastName
        };

        return res
            .status(200)
            .json({
                success: true,
                message: 'Hello World with id ' + id,
                data: userPayload
            })
    },
    deleteUser: (req, res, next) => {
        const { id } = req.params;
        return res.status(200).json({ success: true, message: 'Hello World with id ' + id });
    }
}

module.exports = userController;