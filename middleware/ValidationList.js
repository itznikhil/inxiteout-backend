const Joi = require('joi');
exports.basicPostSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required(),
  
    desc: Joi.string()
        .required(),
  
    username: Joi.string()
    .required(),
}).options({ allowUnknown: true });
exports.caseStudySchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required(),
  
    desc: Joi.string()
        .required(),
  
    result: Joi.string()
        .required(),

    expertise: Joi.array()
        .length(1)
        .required(),

    username: Joi.string()
    .required(),
}).options({ allowUnknown: true });
exports.catSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
}).options({ allowUnknown: true });
exports.expertiseSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required(),
  
    desc: Joi.string()
        .required(),
  
    username: Joi.string()
    .required(),
}).options({ allowUnknown: true });
exports.solutionSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required(),
  
    desc: Joi.string()
        .required(),
  
    username: Joi.string()
    .required(),
}).options({ allowUnknown: true });
exports.userSchema = Joi.object({
    username: Joi.string()
        .min(5)
        .max(30)
        .required(),
  
    email: Joi.string()
        .email()
        .required(),
  
    password: Joi.string()
    .min(8)
    .required(),
}).options({ allowUnknown: true });
exports.loginSchema = Joi.object({
    username: Joi.string()
        .min(5)
        .max(30)
        .required(),
  
    password: Joi.string()
    .min(8)
    .required(),
}).options({ allowUnknown: true });