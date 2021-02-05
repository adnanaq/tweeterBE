const chai = require("chai");
const http = require("chai-http");
const User = require("../schema/user");

const expect = chai.expect;
chai.use(http);

const app = require("../server");
describe("Server", () => {
  //   before((done) => {
  //     User.find()
  //       .deleteMany()
  //       .then((res) => {
  //         done();
  //       })
  //       .catch((err) => {
  //         done(err);
  //       });
  //   });
});

describe("User Registration", () => {
  it("Should return 500 when invalid user info is sent to POST /signup", (done) => {
    //mock invalid user input
    const new_user = {
      username: " ", // empty username field
      email: "user1@user1.com",
      password: "password",
    };

    chai
      .request(app)
      .post("/signup")
      .send(new_user)
      .then((res) => {
        //assertions
        expect(res).to.have.status(500);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return 400 when invalid email is sent to POST /signup", (done) => {
    //mock invalid user input
    const new_user = {
      username: "test", // empty username field
      email: " ",
      password: "password",
    };

    chai
      .request(app)
      .post("/signup")
      .send(new_user)
      .then((res) => {
        //assertions
        expect(res).to.have.status(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return 400 when invalid password is sent to POST /signup", (done) => {
    //mock invalid user input
    const new_user = {
      username: "test1",
      email: "test1@test1.com",
      password: "passwor",
    };

    chai
      .request(app)
      .post("/signup")
      .send(new_user)
      .then((res) => {
        //assertions
        expect(res).to.have.status(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should return 200 when valid information is sent to POST /signup and save to the database", (done) => {
    //mock invalid user input
    const new_user = {
      username: "test1",
      email: "test1@test1.com",
      password: "password",
    };

    chai
      .request(app)
      .post("/signup")
      .send(new_user)
      .then((res) => {
        //assertions
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal("User Created!");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("User Login", () => {
  it("should return 400 for invalid credentials", (done) => {
    //mock invalid user input
    const valid_input = {
      email: "test2@test2.com",
      password: "12345678",
    };
    //send request to the app
    chai
      .request(app)
      .post("/login")
      .send(valid_input)
      .then((res) => {
        //assertions
        expect(res).to.have.status(400);
        // expect(res.body.token).to.exist;
        // expect(res.body.message).to.be.equal("Auth OK");
        // expect(res.body.errors.length).to.be.equal(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should return 200 and token for valid credentials", (done) => {
    //mock invalid user input
    const valid_input = {
      email: "test1@test1.com",
      password: "password",
    };
    //send request to the app
    chai
      .request(app)
      .post("/login")
      .send(valid_input)
      .then((res) => {
        //assertions
        expect(res).to.have.status(200);
        expect(res.body.token).to.exist;
        expect(res.body.message).to.be.equal("Authorization Valid!");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
