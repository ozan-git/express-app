class UserValidator {
    static validate(user) {
        const { firstName, lastName, email, userType } = user;

        let errors = {};
        let isBodyValid = true;

        if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
            isBodyValid = false;
            errors["firstName"] = "This should be a string & not empty";
        }
        if (!lastName || typeof lastName !== "string" || lastName.trim().length === 0) {
            isBodyValid = false;
            errors["lastName"] = "This should be a string & not empty";
        }
        if (!email || typeof email !== "string" || email.trim().length === 0) {
            isBodyValid = false;
            errors["email"] = "This should be a string & not empty";
        }

        if (!userType || typeof userType !== "string" || userType.trim().length === 0) {
            isBodyValid = false;
            errors["userType"] = "This should be a string & not empty";
        } else {
            const checks = ["user", "admin", "support"];
            const found = checks.some((check) => check === userType);

            if (!found) {
                isBodyValid = false;
                errors["userType"] =
                    "This should be a string & can have these values " + checks.join(",");
            }
        }

        return { isValid: isBodyValid, errors };
    }
}

module.exports = UserValidator;