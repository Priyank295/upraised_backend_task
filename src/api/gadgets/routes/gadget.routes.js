const express = require("express");
const gadgetController = require('../controllers/gadget.controller');
const gadgetValidator = require('../validators/gadget.validator');
const router = express.Router();
const auth = require('../../../common/middlewares/auth');


router.get('/',auth,gadgetValidator.validateGetGadget, gadgetController.getAllGadgetsController);

router.post('/',auth,gadgetValidator.validateAddGadget, gadgetController.addGadgetController);

router.put('/:id',auth,gadgetValidator.validateUpdateGadget, gadgetController.updateGadgetController);

router.delete('/:id',auth,gadgetValidator.validateDecommissionGadget, gadgetController.decommissionGadgetController);

router.post('/:id/self-destruct',auth,gadgetValidator.validateSelfDestructGadget, gadgetController.selfDestructGadgetController);


const gadgetRoutes = {
    path: '/gadgets',
    router,
};

module.exports = gadgetRoutes;

