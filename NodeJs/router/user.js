const express = require("express");
const router = express.Router();
const jwt = require("jwt-simple");

//user model
const User = require("../model/user");

//find by user id
router.get("/user/:id", (req, res) => {
  let findId = req.params.id;

  User.findById(findId)
    .exec()
    .then(docs => res.sendStatus(200).json({ message: docs }))
    .catch(err =>
      res.status(500).json({ message: "Error finding user id", error: err })
    );
});

//find by user email
router.get("/user/email/:email", (req, res) => {
  let findEmail = { email: req.params.email };

  User.find(findEmail)
    .then(docs => res.status(200).json(docs))

    .catch(err =>
      res.status(500).json({ message: "Error finding user email", error: err })
    );
});

//login post token
router.post("/user/login", async (req, res) => {
  let data = req.body;
  let user = await User.findOne({ email: data.email, password: data.password });
  let token = jwt.encode(data.email, data.password);

  if (!user) {
    return res.status(401).send({ message: "Email or password invalid" });
  }
  return res.status(200).send({token});
})

//user post
router.post("/user", (req, res) => {
  let user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.sendStatus(500).send({ message: err });
    }
    return res.sendStatus(200);
  });
});

//user put
router.put("/user/:id", (req, res) => {
  let query = { _id: req.params.id };
  let document = {
    // first: req.body.firstName,
    // last: req.body.lastName,
    // email: req.body.email,
    // password: req.body.password,
    isActive: req.body.isActive
  };

  User.update(query, document, (err, respRaw) => {
    if (err) {
      // return res.sendStatus(500).send({ message: err });
      return res.sendStatus(500).send({ message: err });
    }
    return res.status(200).json(respRaw);
  });
});

let userRoute = { router };
module.exports = userRoute;
