global.DATABASE_URL = 'mongodb://localhost/app-test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('app', function() {
    it('should return 200', function(done) {
        chai.request(app)
            .get('/a')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });	
    });

    it('should return 201 on post', function(done) {
       chai.request(app)
       .post('/b')
       .send({'items': [{ "price" : "4.42", "item" : "beer" }]}, {'name': 'Kale'})
       .end(function(err, res) {
       		res.should.have.status(201);
            done();
       });
   });
});


exports.app = app;




    
