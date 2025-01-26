const express = require('express');
const gadgetRoutes = require('../../api/gadgets/routes/gadget.routes');
const userRoutes = require('../../api/users/routes/user.routes');
const router = express.Router();

const defaultRoutes = [
    gadgetRoutes,
    userRoutes,
  ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

module.exports = router;


