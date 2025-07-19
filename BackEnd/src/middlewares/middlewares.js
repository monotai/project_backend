class ValidatorMiddleware {
    constructor(validator) {
        this.validator = validator;
    }

    validate(req, res, next) {
        const { error } = this.validator(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    }
}