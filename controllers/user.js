const userController = {
    getAll: (req, res, next) => {
        return res.status(200).json({ success: true, message: 'Hello World' });
    },
    getById: (req, res, next) => {
        const { id } = req.params;
        return res.status(200).json({ success: true, message: 'Hello World with id ' + id });
    },
    createUser: (req, res, next) => {
        const { id, firstName, lastName } = req.body;

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