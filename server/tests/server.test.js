const request = require('supertest');

const {app}      = require('./../server');
const {Todo}     = require('./../models/todo');

const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
}];

// Clear DB before tests
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);    
    }).then(() => done());
});

describe('Test the rooth path', () => {
    test('Should response the GET method', (done) => {
       return request(app)
        .get('/')
        .expect(200)
        .end(done);
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
                
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(res.body.text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    });
    
    test('Should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
            })

        Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
        }).catch((err) => done(err));
    });
});

describe('GET /todos', () => {
    test('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
            
    });
});
