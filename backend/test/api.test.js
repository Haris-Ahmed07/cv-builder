const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Resume = require('../models/Resume');

// Test user data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'Test123!'
};

// Test resume data
const testResume = {
  personalInfo: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    address: '123 Test St',
    linkedin: 'linkedin.com/in/testuser',
    github: 'github.com/testuser'
  },
  summary: 'Experienced software developer with a passion for building great products',
  education: [
    {
      degree: 'BSc Computer Science',
      school: 'Tech University',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
      grade: '3.8/4.0',
      description: 'Specialized in Web Development and Algorithms'
    }
  ],
  workExperience: [
    {
      title: 'Senior Developer',
      company: 'Tech Corp',
      startDate: '2020-06',
      endDate: 'Present',
      description: 'Developing and maintaining web applications using modern technologies'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  achievements: [
    'Employee of the Year 2022',
    'Best Hackathon Project 2021'
  ],
  projects: [
    {
      title: 'CV Builder',
      techStack: 'React, Node.js, MongoDB',
      description: 'A web application to create and manage professional resumes',
      link: 'https://github.com/testuser/cv-builder'
    }
  ],
  certifications: [
    {
      name: 'Full Stack Web Development',
      issuer: 'Udemy',
      date: '2021-03'
    }
  ],
  languages: ['English (Fluent)', 'Spanish (Intermediate)'],
  sectionOrder: [
    'PersonalInfo',
    'Summary',
    'Education',
    'Work',
    'Skills',
    'Projects',
    'Achievements',
    'Certifications',
    'Languages'
  ]
};

let authToken;

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Clear test data
  await User.deleteMany({});
  await Resume.deleteMany({});
});

describe('Authentication API', () => {
  test('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(testUser);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(testUser.email);
    
    // Save token for subsequent requests
    authToken = res.body.token;
  });

  test('should login existing user', async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(testUser.email);
  });
});

describe('Resume API', () => {
  test('should create a new resume', async () => {
    const res = await request(app)
      .post('/api/resume')
      .set('Authorization', `Bearer ${authToken}`)
      .send(testResume);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.personalInfo.name).toBe(testResume.personalInfo.name);
    expect(res.body.data.summary).toBe(testResume.summary);
    expect(res.body.data.skills).toEqual(expect.arrayContaining(testResume.skills));
    expect(res.body.data.languages).toEqual(expect.arrayContaining(testResume.languages));
  });

  test('should get user resume', async () => {
    const res = await request(app)
      .get('/api/resume')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.personalInfo.name).toBe(testResume.personalInfo.name);
    expect(res.body.data.workExperience[0].title).toBe(testResume.workExperience[0].title);
    expect(res.body.data.education[0].degree).toBe(testResume.education[0].degree);
  });

  test('should update resume', async () => {
    const updatedResume = { ...testResume };
    updatedResume.personalInfo.summary = 'Updated summary';

    const res = await request(app)
      .post('/api/resume')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedResume);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.personalInfo.summary).toBe('Updated summary');
  });

  test('should delete resume', async () => {
    const res = await request(app)
      .delete('/api/resume')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toEqual(200);
    
    // Verify resume is deleted
    const getRes = await request(app)
      .get('/api/resume')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(getRes.statusCode).toEqual(404);
  });
});

afterAll(async () => {
  // Clean up
  await User.deleteMany({});
  await Resume.deleteMany({});
  
  // Close the database connection
  await mongoose.connection.close();
});
