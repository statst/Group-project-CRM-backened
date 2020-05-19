const mongoose = require('mongoose');

class OwnershipError extends Error {
	constructor() {
		super();
		this.name = 'OwnershipError';
		this.statusCode = 401;
		this.message =
			'The provided token does not match the owner of this document';
	}
}

class DocumentNotFoundError extends Error {
	constructor() {
		super();
		this.name = 'DocumentNotFoundError';
		this.statusCode = 404;
		this.message = "The provided ID doesn't match any documents";
	}
}

class BadParamsError extends Error {
	constructor() {
		super();
		this.name = 'BadParamsError';
		this.statusCode = 422;
		this.message = 'A required parameter was omitted or invalid';
	}
}

class BadCredentialsError extends Error {
	constructor() {
		super();
		this.name = 'BadCredentialsError';
		this.statusCode = 422;
		this.message = 'The provided username or password is incorrect';
	}
}
class InvalidIdError extends Error {
	constructor() {
		super();
		this.name = 'InvalidIdError';
		this.statusCode = 422;
		this.message = 'Invalid id';
	}
}

const handleValidateOwnership = (req, document) => {
	const ownerId = document.owner._id || document.owner;
	// Check if the current user is also the owner of the document
	if (!req.user._id.equals(ownerId)) {
		throw new OwnershipError();
	} else {
		return document;
	}
};

const handleRecordExists = (record) => {
	if (!record) {
		throw new DocumentNotFoundError();
	} else {
		return record;
	}
};

const handleValidateId = (req, res, next) => {
	const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
	if (!isValidId) {
		throw new InvalidIdError();
	} else {
		next();
	}
};

const handleValidationErrors = (err, req, res, next) => {
	if (err.name.match(/Valid/) || err.name === 'MongoError') {
		throw new BadParamsError();
	} else {
		next(err);
	}
};

const handleErrors = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).send(message);
};

module.exports = {
	handleValidateOwnership,
	handleRecordExists,
	handleValidateId,
	handleValidationErrors,
	handleErrors,
};
