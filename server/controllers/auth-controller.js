/* globals module require */
"use strict";

module.exports = function(userData) {
    return {
        getLoginForm(req, res) {
            res.status(200)
                .render("login-page");

        },
        tryToLogin(req, res) {
            res.status(301)
                .redirect("/home");
        },
        facebookLogin(req, res) {
            res.status(301).redirect("/home");
        },
        userLogout(req, res) {
            req.logout();
            req.session.destroy();
            res.redirect("/home");
        },
        getRegisterForm(req, res) {
            const isLogged = !!req.user;

            const user = {
                user: {
                    isLogged: isLogged
                }
            }
            res.status(200)
                .render("register", user);
        },
        tryToCreateUser(req, res) {
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                country: req.body.country,
                city: req.body.city
            }

            userData.createUser(user)
                .then(() => {
                    res.redirect(307,"/login");
                })
                .catch((err) => {
                    res.status(404)
                        .send(`REGISTER FAIL, TRY AGAIN ===>${err}`)
                })
        }
    };
}