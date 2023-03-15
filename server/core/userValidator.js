class UserValidator {
    static validate(user) {
        const { displayName, email } = user;

        let errors = {};
        let isBodyValid = true;

        if (!displayName || typeof displayName !== "string" || displayName.trim().length === 0) {
            isBodyValid = false;
            errors["displayName"] = "This should be a string & not empty";
        }

        if (!email || typeof email !== "string" || email.trim().length === 0) {
            isBodyValid = false;
            errors["email"] = "This should be a string & not empty";
        }

        return { isValid: isBodyValid, errors };
    }
}

export default UserValidator;