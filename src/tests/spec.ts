const server = require("../server");
const Participant = require("../models/participants");
const supertest = require("supertest");

console.log('-------------->  ', server)


describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true);
    });
});

// test("POST /participants", async () => {
//     const data = { firstName: "Post 1", lastName: "lastName" };
//
//     await supertest(app).post("/api/v1/participants")
//     .send(data)
//     .expect(200)
//     .then(async (response: any) => {
//         // Check the response
//         expect(response.body._id).toBeTruthy();
//         expect(response.body.title).toBe(data.firstName);
//         expect(response.body.content).toBe(data.lastName);
//
//         // Check data in the database
//         const post = await Participant.findOne({ _id: response.body._id });
//         expect(post).toBeTruthy();
//         expect(post.title).toBe(data.firstName);
//         expect(post.content).toBe(data.lastName);
//     });
// });
