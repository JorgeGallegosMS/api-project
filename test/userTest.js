const app = require('../server.js')
const SpacePic = require('../models/spacePic.js')
const User = require('../models/user.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

const agent = chai.request.agent(app)

const user = {
    username: 'Test User',
    password: 'test'
}

describe('Testing Authentication', function(){
    it('should sign up new user', function(done){
        agent
            .post('/signup')
            .set("content-type", "application/x-www-form-urlencoded")
            .send(user)
            .end(function(err, res){
                if (err) {
                    done(err)
                }
                expect(res.status).to.be.equal(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.haveOwnProperty('pics')
                done()
            })
    })

    it('should logout a user', function(done){
        agent
            .get('/logout')
            .end(function(err, res){
                if (err) {
                    done(err)
                }
                expect(res.status).to.be.equal(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.haveOwnProperty('pics')
                done()
            })
    })

    it('should login a user', function(done){
        agent
            .post('/login')
            .set("content-type", "application/x-www-form-urlencoded")
            .send(user)
            .end(function(err, res){
                if (err) {
                    done(err)
                }
                expect(res.status).to.be.equal(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.haveOwnProperty('pics')
                done()
            })
    })

    after(function(done) {
        agent
            .get('/logout')
            .end(function(err, res){
                if (err) {
                    console.log(err)
                }
                console.log('Logged out')
            })
        User.findOneAndDelete({username: user.username}, (err, user) => {
            if (err) {
                done(err)
            } else {
                done()
            }
        })
    })
})