const request = require('supertest');
const express = require('express');

// Create test app
const app = express();
app.use(express.json());

// Mock data storage
let todos = [];
let nextId = 1;

// Routes
app.post('/todos', (req, res) => {
  const todo = {
    _id: nextId++,
    text: req.body.text,
    done: false
  };
  todos.push(todo);
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo._id !== id);
  res.json({ deleted: true });
});

describe('Todo API', () => {
  beforeEach(() => {
    todos = [];
    nextId = 1;
  });

  test('POST /todos creates task', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ text: 'Test Todo' });
    
    expect(res.status).toBe(200);
    expect(res.body.text).toBe('Test Todo');
    expect(res.body._id).toBe(1);
    expect(todos).toHaveLength(1);
  });

  test('DELETE /todos/:id deletes task', async () => {
    // First create a todo
    await request(app)
      .post('/todos')
      .send({ text: 'Test Todo' });

    // Then delete it
    const res = await request(app)
      .delete('/todos/1');
    
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
    expect(todos).toHaveLength(0);
  });
});
