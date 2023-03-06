class UserValidator {
    static validate(user) {
        const { firstName, lastName, email, userType } = user;
        const errors = {};

        this.validateField(firstName, 'firstName', errors);
        this.validateField(lastName, 'lastName', errors);
        this.validateField(email, 'email', errors);
        this.validateUserType(userType, errors);

        const isValid = Object.keys(errors).length === 0;
        return { isValid, errors };
    }

    static validateField(value, fieldName, errors) {
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
            errors[fieldName] = 'This should be a string & not empty';
        }
    }

    static validateUserType(userType, errors) {
        if (!userType || typeof userType !== 'string' || userType.trim().length === 0) {
            errors['userType'] = 'This should be a string & not empty';
        } else {
            const checks = ['user', 'admin', 'support'];
            if (!checks.includes(userType)) {
                errors['userType'] =
                    'This should be a string & can have these values ' + checks.join(',');
            }
        }
    }
}

module.exports = UserValidator;
