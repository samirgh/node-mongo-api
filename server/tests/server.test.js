// const jest       = require('jest');

const request = require('supertest');

const {app}      = require('./../server');
const {Todo}     = require('./../models/todo');

// Clear DB before tests
beforeAll((done) => {
    Todo.remove({}).then(() => {
        done();
    });
});

describe('Test the rooth path', () => {
    test('Should response the GET method', (done) => {
       return request(app)
        .get('/').then((res) => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });   
});

describe('POST /todos', () => {
    test('Should create a new todo', (done) => {
        var text = "This is from a test 3";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) return done(err);
                
                 // Check that set stuff is correct
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(res.body.text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    });
});

