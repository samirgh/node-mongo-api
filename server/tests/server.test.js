const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app}      = require('./../server');
const {Todo}     = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

// Clear DB and add two (2) test items
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
    test('Should GET all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
            
    });
});

describe('GET /todos/:id', () => {
    test('Should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('First test todo')
            })
            .end(done);
    });

    test('Should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    test('Should return 404 for non-object IDs', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    test('Should remove a todo', (done) => {
        var hexId = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // query database using findById
                Todo.findById(hexId).then((todo) => {
                    expect.toBe(null);
                }).catch((e) => done(err))

            });
    });

    test('Should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });

    test('Should return 404 if objectID is invalid', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done)
    });
});
