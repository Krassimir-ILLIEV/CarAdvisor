/* global require module*/
"use strict";

const mongoose = require("mongoose");
//const regex = "/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i";

const userSchema = new mongoose.Schema({
    username: { type: String, validate: /[a-zA-Z0-9]+/, required: true, unique: true },
    salt: { type: String, required: true },
    passHash: { type: String, required: true },
    email: { type: String },
    firstname: { type: String, validate: /[a-zA-Z]+/, required: true },
    lastname: { type: String, validate: /[a-zA-Z]+/, required: true },
    age: { type: Number, min: 0, max: 150 },
    country: { type: String },
    city: { type: String },
    userOfferTours: [{}],
    userBoughtTours: [{}],
    facebookId: { type: String },
    facebookToken: { type: String }
});

mongoose.model("user", userSchema);

module.exports = mongoose.model("user");