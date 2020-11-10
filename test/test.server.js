const app = require("../server.js");
const chai = require('chai');
const chaiHttp = require("chai-http");
const {expect} = chai;

chai.use(chaiHttp);

describe("Server testing!", ()=>{
    it("welcomes user to the api", done => {
        chai.request(app).get("/").end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equals("app.get successful");
          done();
        });
    });
})
describe("testing schedule endpoints",()=>{
  it("testing schedule.getAll endpoint", done=>{
    chai.request(app).get("/schedule").end(function(err,res){
      expect(res).to.have.status(200);
      expect(res.body[0]).to.have.property("idschedules");
      expect(res.body[0]).to.have.property("schedulesName");
      expect(res.body).to.be.a('array');
      done();
    })
  })
    it("testing schedule.selectbyID endpoint", done=>{
      chai.request(app).get("/schedule1").end(function(err,res){
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property("idschedules");
        expect(res.body[0]).to.have.property("schedulesName");
        expect(res.body).to.be.a('array');
        done();
    })
  })
})
  describe("testing requirements endpoints",function(){
    it("testing requirements.getAll endpoint", done=>{
      chai.request(app).get("/requirements").end(function(err,res){
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property("idRequirements");
        expect(res.body).to.be.a('array');
        done();
      })
    })
  })
  describe("testing users endpoints",function(){
    it("testing users.getAll endpoint", done=>{
      chai.request(app).get("/user").end(function(err,res){
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property("idusers");
        expect(res.body).to.be.a('array');
        done();
      })
    })
  })
