import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Data Controller', () => {
  // Test getAllData function
  describe('GET /api/data', () => {
    it('should get all data', (done) => {
      chai.request(app)
        .get('/api/data')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          // Add more assertions based on your response structure
          done();
        });
    });
  });

  // Test addData function
  describe('POST /api/data', () => {
    it('should add a new record', (done) => {
      chai.request(app)
        .post('/api/data')
        .send({
          Name: 'John Doe',
          Age: 30,
          City: 'Example City',
          Email: 'johndoe@example.com',
          'Phone Number': '123-456-7890',
          id: 1
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Record added successfully');
          done();
        });
    });
  });

  // Test updateData function
  describe('PATCH /api/data/:id', () => {
    it('should update an existing record', (done) => {
      chai.request(app)
        .patch('/api/data/1')
        .send({
          Age: 31
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Record updated successfully');
          done();
        });
    });
  });

  // Test deleteData function
  describe('DELETE /api/data/:id', () => {
    it('should delete an existing record', (done) => {
      chai.request(app)
        .delete('/api/data/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Record deleted successfully');
          done();
        });
    });
  });
});
