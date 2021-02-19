'use strict'

const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp); //associate the module with chai
const app = require('../index');

describe(`A simple test`, () => {

    // does 1+1=2
    it(`should return 2 when 1+1`, () => {
        const expression = 1 + 1;
        expect(expression).to.equal(2);
    })
})

describe(`Task Routes`, () => {

    // it(`test hello`, (done) => {
    //     // check if the call is successful
    //     // app = http://localhost:5001
    //     chai.request(app)
    //         .get("/hello")
    //         .end((err, response) => {
    //             if (err) {
    //                 console.log(`something went wrong`);
    //                 done(err);
    //             } else {
    //                 expect(response).to.have.status(200);
    //                 expect(response).to.not.be.null;
    //                 expect(response).to.have.property('text', 'hello');
    //                 done();
    //             }
    //         })
    // })

    it(`Test /getAll route`, (done) => {
        // app = http://localhost:5001
        chai.request(app)
            .get('/task/getAll')
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res).to.have.status(200);
                    expect(res.body).to.not.be.null;
                    res.body.map((item) => expect(item).to.contain.keys('_id'));
                    res.body.map((item) => expect(item).to.be.a('object'));
                    res.body.map((item) => expect(item._id).to.be.a('string'));
                    done();
                }
            })
    })

    it(`Test /create route`, (done) => {
        // app = http://localhost:5001
        chai.request(app)
            .post('/task/create')
            .send({ 'description': 'test task create' })
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(err).to.be.null;
                    expect(res).to.not.be.undefined;
                    expect(res).to.have.status(201);
                    expect(res).to.have.property('text', 'Task has beed added successfully!');
                    done();
                }
            })
    })
})