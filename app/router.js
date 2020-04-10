'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/v1/func', controller.home.show);
  router.post('/api/v1/run/:id', controller.home.run);
  router.post('/api/v1/save', controller.home.save);
};
