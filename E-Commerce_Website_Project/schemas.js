const Joi = require('joi');

module.exports.productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string.require(),
    price: Joi.number.require(),
    desc: Joi.string.require()
});


module.exports.reviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5),
    comment: Joi.string().required()
});