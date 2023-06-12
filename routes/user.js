const router = require('express').Router();
const { getUserMe, patchUserMe } = require('../controllers/user');

router.get('/me', getUserMe);
router.patch('/me', patchUserMe);

module.exports = router;
