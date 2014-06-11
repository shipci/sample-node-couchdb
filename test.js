var superagent = require("superagent"),
    chai = require("chai"),
    expect = chai.expect,
    should = require("should");

describe("Index", function () {
  it("renders HTML", function (done) {
    superagent.get("http://localhost:3000/")
      .end(function (e, res) {
        (e === null).should.equal(true);
        console.log('res.text: ' + res.text);
        res.text.should.equal("Hey buddy!");
        done();
      });
  });
});

describe("Persistence", function () {
  it("should create a thing", function (done) {
    superagent.get("http://localhost:3000/doobie")
      .end(function (e, res) {
        (e === null).should.equal(true);
        console.log('indexOf:::: ' + res.text.indexOf('new'));
        var response = (res.text.indexOf("new") !== -1);
        expect(response).to.equal(true);
        done();
      });
  });
  it("should retrieve a thing", function (done) {
    superagent.get("http://localhost:3000/doobie")
      .end(function (e, res) {
        (e === null).should.equal(true);
        var response = res.body;
        console.log('response BODY: ' + res.text[2]);
        response.should.have.property("name", "doobie");
        done();
      });
  });
});
