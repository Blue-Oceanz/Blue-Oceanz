import app from "../app.js"
import supertest from "supertest"

// var token = ""
// const response = await supertest(app)
//     .post("/users/login")
//     .send({
//         email:"in@email.com",
//         password:"1234"
//     })
//     token = response.body.token;




// test("login", async () => {
//     // const response = await supertest(app)
//     // .post("/users/login")
//     // .send({
//     //     email:"in@email.com",
//     //     password:"1234"
//     // })
//     // token = response.body.token;
//     // expect(response.statusCode).toEqual(200);
//     console.log(token, 'THIS IS TOKEN')

// });

let token = '';

beforeAll(async () => {
  const response = await supertest(app)
  .post('/users/login')
  .send({
    email:"jm@email.com",
    password:"12345"
})
token = response.body.token;
  
});

// let token2 = '';

// beforeRegister(async () => {
//   const regResponse = await supertest(app)
//   .post('/register')
//   .send({
//     first:"jim",
//     last:"mohty",
//     email:"jm@email.com",
//     password:"12345",
//     role:"user"
// })
// // token2 = response.body.token;
  
// });

describe('Add user to database with auth', () => {
  console.log(token, 'get token')
  test.only('should respond with company name Google', async () => {
    const response = await supertest(app)
      .get('/applications')
      .set('Authorization', `Bearer ${token}`);
      console.log(response)

    expect(response).toBe("Google");
  });
});

// describe('Retrieve Company from user login with auth', () => {
//     console.log(token, 'get token')
//     test.only('should respond with company name Google', async () => {
//       const response = await supertest(app)
//         .get('/applications')
//         .set('Authorization', `Bearer ${token}`);
//         console.log(response.body[0].company)
  
//       expect(response.body[0].company).toBe("Google");
//     });
//   });