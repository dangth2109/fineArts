// backend/seedData.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Competition = require('./models/Competition');
const Submission = require('./models/Submission');
const Exhibition = require('./models/Exhibition');
const Award = require('./models/Award');

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete old data
    await User.deleteMany({});
    await Competition.deleteMany({});
    await Submission.deleteMany({});
    await Exhibition.deleteMany({});
    await Award.deleteMany({});

    // Create users
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      personalInfo: {
        firstName: 'Admin',
        lastName: 'User',
        phone: '0123456789'
      }
    });

    const staff = await User.create({
      username: 'staff',
      email: 'staff@example.com', 
      password: hashedPassword,
      role: 'staff',
      personalInfo: {
        firstName: 'Staff',
        lastName: 'User',
        phone: '0123456789'
      },
      staffInfo: {
        joinDate: new Date(),
        subjects: ['Painting', 'Drawing'],
        class: 'Art-101'
      }
    });

    const student = await User.create({
      username: 'student',
      email: 'student@example.com',
      password: hashedPassword,
      role: 'student',
      personalInfo: {
        firstName: 'Student',
        lastName: 'User',
        phone: '0123456789'
      },
      studentInfo: {
        admissionDate: new Date(),
        course: 'Fine Arts'
      }
    });

    // Create competition
    const competition = await Competition.create({
      title: 'Spring Art Competition 2024',
      description: 'Annual spring art competition for students',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30*24*60*60*1000), // 30 days from now
      conditions: [
        'Original artwork only',
        'Maximum size 100x100cm',
        'Any medium accepted'
      ],
      awards: [
        {
          rank: '1st',
          prize: '$1000',
          description: 'First Prize'
        },
        {
          rank: '2nd',
          prize: '$500',
          description: 'Second Prize'
        }
      ],
      status: 'ongoing',
      createdBy: staff._id
    });

    // Create submission
    const submission = await Submission.create({
      competition: competition._id,
      student: student._id,
      imageUrl: 'https://example.com/sample-art.jpg',
      description: 'Spring landscape painting',
      evaluation: {
        grade: 'best',
        remarks: 'Excellent work',
        evaluatedBy: staff._id,
        evaluatedAt: new Date()
      }
    });

    // Create exhibition
    const exhibition = await Exhibition.create({
      title: 'Spring Art Exhibition 2024',
      description: 'Showcasing the best artworks from our students',
      startDate: new Date(),
      endDate: new Date(Date.now() + 14*24*60*60*1000), // 14 days from now
      location: 'Main Gallery',
      submissions: [{
        submission: submission._id,
        price: 500,
        status: 'available'
      }],
      createdBy: staff._id
    });

    // Create award
    await Award.create({
      competition: competition._id,
      submission: submission._id,
      student: student._id,
      rank: '1st',
      prize: '$1000',
      remarks: 'Outstanding achievement',
      awardedBy: staff._id
    });

    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();