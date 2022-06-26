const { Users } = require('../models');

const userController = {
    getUsers(req, res) {
        Users.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addUser({ body }, res) {
        Users.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },
    getUserByID({ params }, res) {
        Users.findOne({ _id: params.id })
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No users found with this ID!' });
                    return;
                }

                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser({params}, res) {
        Users.findOneAndDelete({_id: params.id})
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No users found with this ID!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({params}, res){
        Users.findOneAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendID}},
            {runValidators: true, new: true}
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No users found with this ID!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteFriend({params}, res) {
        Users.findOneAndUpdate(
            {_id: params.id},
            {$pull: {friends: params.friendID}},
            { new: true, runValidators: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No users found with this ID!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }
}

module.exports = userController;