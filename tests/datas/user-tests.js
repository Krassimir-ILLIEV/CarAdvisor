/* globals describe it beforeEach afterEach */

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("User data", () => {
    let sinon;

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class User {
        constructor(properties) {
            this.username = properties.username,
            this.salt = properties.salt,
            this.passHash = properties.passHash,
            this.firstname = properties.firstname,
            this.lastname = properties.lastname,
            this.email = properties.email,
            this.age = properties.age,
            this.country = properties.country,
            this.city = properties.city
        }

        static create() {}
        static find() {}
        static findOne() {}
        static findAll() {}
    }

    let data = require("../../server/data/user-data")({
        User
    });

    describe("getAllUsers()", () => {
        it("Expect to return 2 users", done => {
            let users = ["pesho", "gosho"];

            sinon.stub(User, "find", (_, cb) => {
                cb(null, users);
            });

            data.getAllUsers()
                .then(actualUsers => {
                    expect(actualUsers).to.eql(users);
                    done();
                });
        });
    });

    describe("getUserById()", () => {
        let userId = 1;

        let user = {
                _id: userId,
                name: "Pesho"
            },
            users = [user];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let id = query._id;
                let foundUser = users.find(u => u._id === id);

                cb(null, foundUser || null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {
            data.getUserById(userId)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });

        it("Expect to return null, if user is not found", done => {
            data.getUserById(42)
                .then(actualUser => {
                    expect(actualUser).to.be.null;
                    done();
                });
        });
    });


    describe("getUserByUsername()", () => {
        let username = "Pesho";

        let user = {
                username
            },
            users = [user];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let username = query.username;
                let foundUser = users.find(u => u.username === username);

                cb(null, foundUser || null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {
            data.getUserByUsername(username)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });

        it("Expect to reject with name, if user is not found", done => {
            let name = "Gosho";

            data.getUserByUsername(name)
                .catch(err => {
                    expect(err).to.equals(name);
                    done();
                });
        });
    });

    describe("createUser()", () => {
        let username = "Pesho",
            user = {
                username: username,
                salt: "",
                passHash: "",
                email: "",
                firstname: "",
                lastname: "",
                age: "",
                country: "",
                city: ""
            };

        afterEach(() => {
            sinon.restore();
        });

        it("Expect user to be created", done => {
            sinon.stub(User, "create", (user, cb) => {
                cb(null, user);
            });

            data.createUser(user)
                .then(actualUser => {
                    expect(actualUser.username).to.equal(username);
                    done();
                });
        });

        it("Expect to reject user to be created", done => {
            let errorMessage = "Error";

            sinon.stub(User, "create", (user, cb) => {
                cb(errorMessage, user);
            });

            data.createUser(user)
                .catch(actualMessage => {
                    expect(actualMessage).to.equal(errorMessage);
                    done();
                });
        });
    });
});