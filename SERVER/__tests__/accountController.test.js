const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());


describe('POST /user', () => {
  it('should create an account successfully', async () => {
    const response = await request(app).post('/user').send({
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
      birth_date: '1990-01-01'
    });

    expect(response.status).toBe(201);
  });

  it('should return an error if username is missing', async () => {
    const response = await request(app).post('/user').send({
      lastName: 'Doe',
      gender: 'male',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
      birth_date: '1990-01-01'
    });

    expect(response.status).toBe(400);
  });
});

describe('GET /user/:id', () => {
  it('should return user information', async () => {
    const userId = '6c9f6db0-a658-4809-8e78-2f227eb48a58';
    const response = await request(app).get(`/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: userId
    });
  });
});