const router = require('express').Router();

const {
    getThoughts,
    getThoughtsByID,
    addThoughts,
    updateThoughts,
    deleteThoughts,
    addReactions,
    deleteReaction
} = require('../../controllers/thoughtsController');

router.route('/')
.get(getThoughts).post(addThoughts)

router.route('/:thoughtId')
.get(getThoughtsByID)
.put(updateThoughts)
.delete(deleteThoughts)

router.route('/:thoughtId/reactions')
.post(addReactions)

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;