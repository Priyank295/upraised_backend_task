const httpStatus = require('http-status');
const { dataSource } = require('../../../common/config/db-config');
const { v4: uuidv4 } = require('uuid');
const gadgetRepository = dataSource.getRepository('Gadget');

const getAllGadgets = async (status) => {
    
    let gadgets;
    
    if (status) {
      gadgets = await gadgetRepository.find({ where: { status } });
    } else {
      gadgets = await gadgetRepository.find();
    }
    
   
    return gadgets;
}

const addGadget = async (name) => {
    
    const gadget = {
        id: uuidv4(),
        name: name || codenames[Math.floor(Math.random() * codenames.length)],
        status: 'Available'
    };
    await gadgetRepository.save(gadget);
    return gadget;
}

const updateGadget = async (id, updateData) => {

    const gadget = await gadgetRepository.findOneBy({ id });
    if (!gadget) {
        throw new Error('Gadget not found');
    }
    Object.assign(gadget, updateData);
    await gadgetRepository.save(gadget);
    return gadget;
}

const decommissionGadget = async (id) => {
    
    const gadget = await gadgetRepository.findOneBy({ id });
    if (!gadget) {
        throw new Error('Gadget not found');
    }
    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();
    await gadgetRepository.save(gadget);
    return gadget;
}

const selfDestructGadget = async (id) => {
    
    const gadget = await gadgetRepository.findOneBy({ id });
    if (!gadget) {
        throw new Error('Gadget not found');
    }
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    gadget.status = 'Destroyed';
    await gadgetRepository.save(gadget);
    return { gadget, confirmationCode };
}

module.exports = {getAllGadgets, addGadget, updateGadget, decommissionGadget, selfDestructGadget};