var request = require("supertest");

var app = require("../app").app;

var should = require("should");

describe("TestAPI", function(){

    it('should be able to create a user', function(done) {
        request(app)
            .post('/register')
            .set('accept', 'application/json')
            .send({firstName: 'Pamela', lastName: 'Gangopadhyay', email: 'pgd81@email.com', password: 'changeMe'})
            .expect(200)
            .end(function(err, res) {

                res.status.should.equal(200);

                res.type.should.equal('application/json');

                var return_data = JSON.parse(res.text);

                return_data.should.have.property('status');

                done();

            });
    });

    it('should be able to authenticate a user', function(done) {
        request(app)
            .post('/register')
            .set('accept', 'application/json')
            .send({email: 'pgd81@email.com', password: 'changeMe'})
            .expect(200)
            .end(function(err, res) {

                res.status.should.equal(200);

                res.type.should.equal('application/json');

                var return_data = JSON.parse(res.text);

                return_data.should.have.property('return_value');

                done();

            });
    });

    it('should be able to update a user', function(done) {
        request(app)
            .post('/register')
            .set('accept', 'application/json')
            .send({firstName: 'Pamela', lastName: 'Gangopadhyay', email: 'pgd181@email.com', password: 'changeMe'})
            .expect(200)
            .end(function(err, res) {

                res.status.should.equal(200);

                res.type.should.equal('application/json');

                var return_data = JSON.parse(res.text);

                return_data.should.have.property('return_value');

                done();

            });
    });

});

