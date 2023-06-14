const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getUserMe, patchUserMe, signout } = require('../controllers/user');
const userMeRules = require('../validationRules/userMe');

router.get('/me', getUserMe);
router.patch('/me', celebrate(userMeRules), patchUserMe);
router.post('/me/signout', signout);

module.exports = router;
