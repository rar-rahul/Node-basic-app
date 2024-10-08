const request = require('supertest');
const app = require('../app');
const User = require('../model/Users')
const bcrypt = require('bcrypt');

const testUser = {
    name: 'Rahul',
    email: 'rahul@gmail.com',
    password: 'password123',
    mobile: '1234567890', 
};


beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await User.create({ email: testUser.email, password: hashedPassword ,mobile: testUser.mobile,name: testUser.name});
});

describe('Post/register',  () => {

    it('Should reagister with new user',async () => {
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        const response = await request(app)
        .post('/register')
        .send({
        name: testUser.name, 
        email: testUser.email, 
        password: hashedPassword,
        mobile: testUser.mobile 
        })

        expect(response.statusCode).toBe(200);
    })

    it('should not register a user with existing email', async () => {
        const response = await request(app)
            .post('/register')
            .send(testUser);
        
        expect(response.statusCode).toBe(200);
    });

    //login test case
    it('should log in a user and redirect', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: testUser.email,
                password: testUser.password,
            });
        
            console.log(response)
      
        expect(response.statusCode).toBe(200);
    });

    it('should not log with invalid cred', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: testUser.email,
                password: 'wrongpassword', // Incorrect password
            });
        
        expect(response.statusCode).toBe(200);
    });

    it('should return error message for non-existing email', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'rrr@gmail.com', // Non-existing email
                password: testUser.password,
            });
        
        expect(response.statusCode).toBe(200);
    });


})

// Clean up test data after tests
afterAll(async () => {
    await User.deleteMany({ email: testUser.email });
});