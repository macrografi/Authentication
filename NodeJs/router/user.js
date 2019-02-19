const express = require("express");
const router = express.Router();

//user model
const User = require("../model/user");

//find by user id
router.get("/user/:id", (req, res) => {
  let findId = req.params.id;

  User.findById(findId)
    .exec()
    .then(docs => res.sendStatus(200).json({ message: docs }))
    .catch(err =>
      res.status(500).json({ message: "Error finding user", error: err })
    );
});

//user post
router.post("/user", (req, res) => {
  let user = new User(req.body);
  // console.log(user);
  user.save((err, user) => {
    if (err) {
      return res.sendStatus(500).send({ message: err });
    }
    return res.sendStatus(200);
  });
});

let userRoute = { router };
module.exports = userRoute;
