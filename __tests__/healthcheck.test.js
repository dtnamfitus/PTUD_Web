const request = require("supertest");
const mongoose = require("mongoose");
let app;
let server;

beforeAll(() => {
  process.env.NODE_ENV = "test";
  app = require("../index");
  server = app.listen(4000);
});

afterAll((done) => {
  server.close(done);

  if (mongoose.connection.readyState !== 0) {
    mongoose.disconnect(done);
  }
});

describe("Healthcheck API Test", () => {
  it('should return "Healthcheck is OK"', async () => {
    const response = await request(server).get("/healthcheck");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Healthcheck is OK");
  });
});
