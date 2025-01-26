const Joi = require('joi');

const getGadgetSchema = Joi.object({
  status: Joi.string().valid('Available', 'Deployed', 'Destroyed', 'Decommissioned').optional(),
});

const addGadgetSchema = Joi.object({
  name: Joi.string().optional(),
});

const updateGadgetSchema = Joi.object({
  name: Joi.string().optional(),
  status: Joi.string().valid('Available', 'Deployed', 'Destroyed', 'Decommissioned').optional(),
});

const decommissionGadgetSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const selfDestructGadgetSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const validate = (schema, property = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateGetGadget: validate(getGadgetSchema, 'query'),
  validateAddGadget: validate(addGadgetSchema),
  validateUpdateGadget: validate(updateGadgetSchema),
  validateDecommissionGadget: validate(decommissionGadgetSchema, 'params'),
  validateSelfDestructGadget: validate(selfDestructGadgetSchema, 'params'),
};