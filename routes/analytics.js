const router = require('express').Router();
const controller = require('../controllers/analytics');

router.post('/analytics', controller.createEvents);
router.get('/analytics', controller.getAllEvents);
router.delete('/analytics/:id', controller.notAllowed);
router.put('/analytics/:id', controller.notAllowed);
router.patch('/analytics/:id', controller.notAllowed);

module.exports = router;
