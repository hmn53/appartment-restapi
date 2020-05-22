const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

//Assertion style
chai.should();

//Http
chai.use(chaiHttp);

let adminToken = "";
let userToken = "";

//tests

/**
 * Admin routes test
 */

describe("Tests for Admin Routes", () => {
  /**
   * Test POST /admin/login
   */
  describe("POST /admin/login", () => {
    it("It should login as an admin", (done) => {
      const data = {
        username: "admin",
        password: "DCpQahY8Uh",
      };
      chai
        .request(server)
        .post("/admin/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("auth").eq(true);
          res.body.should.have.property("jwt_token");
          adminToken = res.body.jwt_token;
          done();
        });
    });
  });

  /**
   * Test GET /admin/users
   */
  describe("GET /admin/users", () => {
    it("It should get all the users", (done) => {
      chai
        .request(server)
        .get("/admin/users")
        .set("Cookie", `token=${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test POST /admin/users
   */
  describe("POST /admin/users", () => {
    it("It should add a new user", (done) => {
      const data = {
        username: "sam123",
        password: "samklip",
      };
      chai
        .request(server)
        .post("/admin/users")
        .send(data)
        .set("Cookie", `token=${adminToken}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test GET(by id) /admin/users/:id
   */
  describe("GET /admin/users/2", () => {
    it("It should get user with id 2", (done) => {
      chai
        .request(server)
        .get("/admin/users/2")
        .set("Cookie", `token=${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  /**
   * Test PUT(by id) /admin/users/:id
   */
  describe("PUT /admin/users/2", () => {
    it("It should update user with id 2", (done) => {
      const data = {
        username: "mike123",
        password: "mikeangel",
      };
      chai
        .request(server)
        .put("/admin/users/2")
        .send(data)
        .set("Cookie", `token=${adminToken}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test DELETE(by id) /admin/users/:id
   */
  describe("DELETE /admin/users/2", () => {
    it("It should delete user with id 2", (done) => {
      chai
        .request(server)
        .delete("/admin/users/2")
        .set("Cookie", `token=${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  /**
   * Test POST /admin/logout
   */
  describe("POST /admin/logout", () => {
    it("It should logout admin", (done) => {
      chai
        .request(server)
        .post("/admin/logout")
        .set("Cookie", `token=${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

/**
 * User routes test
 */

describe("Tests for User Routes", () => {
  /**
   * Test POST /user/login
   */
  describe("POST /user/login", () => {
    it("It should login as a user", (done) => {
      const data = {
        username: "rahul",
        password: "aada3wfKqE",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("auth").eq(true);
          res.body.should.have.property("jwt_token");
          userToken = res.body.jwt_token;
          done();
        });
    });
  });

  /**
   * Test POST /user/logout
   */
  describe("POST /user/logout", () => {
    it("It should logout user", (done) => {
      chai
        .request(server)
        .post("/admin/logout")
        .set("Cookie", `token=${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

/**
 * Appartment routes test
 */

describe("Tests for Appartment Routes", () => {
  describe("Appartment routes as an admin", () => {
    /**
     * Test GET /appartment as admin
     */
    describe("GET /appartment as an admin", () => {
      it("It should get all the appartments", (done) => {
        chai
          .request(server)
          .get("/appartment")
          .set("Cookie", `token=${adminToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });

    /**
     * Test POST /appartment as an admin
     */
    describe("POST /appartment", () => {
      it("It should add a new appartment as an admin", (done) => {
        const data = {
          userid: 1,
          floor: 2,
          number: 90,
          bedroom: "small",
          owner: "Ramesh",
          tenant: "Raj",
        };
        chai
          .request(server)
          .post("/appartment")
          .send(data)
          .set("Cookie", `token=${adminToken}`)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    /**
     * Test GET(by id) /appartment/:id as an admin
     */
    describe("GET(by id) /appartment/2 as an admin", () => {
      it("It should get appartment with id 2", (done) => {
        chai
          .request(server)
          .get("/appartment/2")
          .set("Cookie", `token=${adminToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });
    /**
     * Test PUT(by id) /appartment/:id as an admin
     */
    describe("PUT /appartment/2 as an admin", () => {
      it("It should update appartment with id 2", (done) => {
        const data = {
          userid: 1,
          floor: 4,
          number: 404,
          bedroom: "large",
          owner: "Roy",
          tenant: "Raj",
        };
        chai
          .request(server)
          .put("/appartment/2")
          .send(data)
          .set("Cookie", `token=${adminToken}`)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    /**
     * Test DELETE(by id) /appartment/:id as an admin
     */
    describe("DELETE /appartment/2 as an admin", () => {
      it("It should delete appartment with id 2", (done) => {
        chai
          .request(server)
          .delete("/appartment/2")
          .set("Cookie", `token=${adminToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });
  });

  describe("Appartment routes as a user", () => {
    /**
     * Test GET /appartment as userid 1
     */
    describe("GET /appartment as a user", () => {
      it("It should get the appartments created by userid 1", (done) => {
        chai
          .request(server)
          .get("/appartment")
          .set("Cookie", `token=${userToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    /**
     * Test POST /appartment as an admin
     */
    describe("POST /appartment", () => {
      it("It should add a new appartment as a user", (done) => {
        const data = {
          floor: 1,
          number: 15,
          bedroom: "big",
          owner: "Rahul",
          tenant: "None",
        };
        chai
          .request(server)
          .post("/appartment")
          .send(data)
          .set("Cookie", `token=${userToken}`)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    /**
     * Test GET(by id) /appartment/:id as an admin
     */
    describe("GET(by id) /appartment/3 as a user", () => {
      it("It should get appartment with id 3", (done) => {
        chai
          .request(server)
          .get("/appartment/3")
          .set("Cookie", `token=${userToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });
    /**
     * Test PUT(by id) /appartment/:id as an admin
     */
    describe("PUT /appartment/3 as an admin", () => {
      it("It should update appartment with id 3", (done) => {
        const data = {
          floor: 3,
          number: 400,
          bedroom: "large",
          owner: "Rubel",
          tenant: "Brad",
        };
        chai
          .request(server)
          .put("/appartment/3")
          .send(data)
          .set("Cookie", `token=${userToken}`)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    /**
     * Test DELETE(by id) /appartment/:id as an admin
     */
    describe("DELETE /appartment/3 as a user", () => {
      it("It should delete appartment with id 3", (done) => {
        chai
          .request(server)
          .delete("/appartment/3")
          .set("Cookie", `token=${userToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });
  });
});
