const mongoose = require('../db/connection');

const ProductSchema = new mongoose.Schema({
	PRODUCT_ID: Number,
	PRODUCT_NAME: String,
	PRODUCT_CODE: String,
	PRODUCT_SKU: Number,
	DESCRIPTION: String,
	PRODUCT_FAMILY: String,
	PRODUCT_IMAGE_URL: String,
	CURRENCY_CODE: String,
	DEFAULT_PRICE: Number,
	DATE_CREATED_UTC: Date,
	DATE_UPDATED_UTC: Date,
	CREATED_USER_ID: { type: Number, default: 0 },
	OWNER_USER_ID: { type: Number, default: 0 },
	ACTIVE: Boolean,
	CUSTOMFIELDS: [
		{
			FIELD_NAME: String,
			FIELD_VALUE: Object,
		},
	],
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
