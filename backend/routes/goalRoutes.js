const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoals, deleteGoals } = require('../controllers/goalController')
// const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getGoals).post(setGoal)

router.route('/:id').put(updateGoals).delete(deleteGoals)

module.exports = router