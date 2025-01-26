const catchAsync = require('../../../common/response/catchAsync');
const httpStatus = require('http-status');
const gadgetService = require('../services/gadget.service');


const getAllGadgetsController = catchAsync(async (req, res) => {
    const status = req.query.status;
    const gadgets = await gadgetService.getAllGadgets(status);

    if(gadgets.length === 0) {
        return res.status(httpStatus.default.NOT_FOUND).send({
            message: 'No gadgets found'
        });
    }
    res.status(httpStatus.status.OK).send(gadgets);
    }
);

const addGadgetController = catchAsync(async (req, res) => {
    const name = req.body.name;
    const gadget = await gadgetService.addGadget(name);
    res.status(httpStatus.status.CREATED).send(gadget);
    }
);

const updateGadgetController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const gadget = await gadgetService.updateGadget(id, updateData);
    res.status(httpStatus.status.OK).send(gadget);
    }
);

const decommissionGadgetController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const gadget = await gadgetService.decommissionGadget(id);
    res.status(httpStatus.status.OK).send(gadget);
    }
);

const selfDestructGadgetController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const gadget = await gadgetService.selfDestructGadget(id);
    res.status(httpStatus.status.OK).send(gadget);
    }
);



module.exports = { getAllGadgetsController, addGadgetController, updateGadgetController, decommissionGadgetController, selfDestructGadgetController };