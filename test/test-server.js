var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('app', function() {
    it('should return 200', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should add an item on post');
    it('should edit an item on put');
    it('should delete an item on delete');
});


exports.app = app;


