'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/func', controller.home.show);
  router.post('/run/:id', controller.home.run);
  router.post('/save', controller.home.save);
};
