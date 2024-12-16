const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fine Arts Institute API',
      version: '1.0.0',
      description: 'API documentation for Fine Arts Institute',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          User: {
            type: 'object',
            properties: {
              username: { 
                type: 'string',
                required: true,
                unique: true
              },
              email: { 
                type: 'string',
                required: true,
                unique: true
              },
              password: { 
                type: 'string',
                required: true
              },
              role: { 
                type: 'string',
                enum: ['student', 'staff', 'admin', 'manager'],
                required: true
              },
              personalInfo: {
                type: 'object',
                properties: {
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  phone: { type: 'string' },
                  address: { type: 'string' }
                }
              },
              staffInfo: {
                type: 'object',
                properties: {
                  joinDate: { 
                    type: 'string',
                    format: 'date-time'
                  },
                  subjects: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  class: { type: 'string' }
                }
              },
              studentInfo: {
                type: 'object',
                properties: {
                  admissionDate: {
                    type: 'string',
                    format: 'date-time'
                  },
                  course: { type: 'string' }
                }
              }
            }
          },
      
          Competition: {
            type: 'object',
            properties: {
              title: { 
                type: 'string',
                required: true
              },
              description: { type: 'string' },
              startDate: { 
                type: 'string',
                format: 'date-time',
                required: true
              },
              endDate: { 
                type: 'string',
                format: 'date-time',
                required: true
              },
              conditions: { 
                type: 'array',
                items: { type: 'string' }
              },
              awards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    rank: { type: 'string' },
                    prize: { type: 'string' },
                    description: { type: 'string' }
                  }
                }
              },
              status: {
                type: 'string',
                enum: ['upcoming', 'ongoing', 'completed'],
                default: 'upcoming'
              },
              createdBy: {
                type: 'string',
                description: 'Reference to User ID'
              }
            }
          },
      
          Submission: {
            type: 'object',
            properties: {
              competition: {
                type: 'string',
                description: 'Reference to Competition ID',
                required: true
              },
              student: {
                type: 'string',
                description: 'Reference to Student User ID',
                required: true
              },
              imageUrl: {
                type: 'string',
                description: 'URL of the uploaded artwork',
                required: true
              },
              description: { type: 'string' },
              poem: { type: 'string' },
              story: { type: 'string' },
              evaluation: {
                type: 'object',
                properties: {
                  grade: {
                    type: 'string',
                    enum: ['best', 'better', 'good', 'moderate', 'normal', 'disqualified']
                  },
                  remarks: { type: 'string' },
                  evaluatedBy: {
                    type: 'string',
                    description: 'Reference to User ID'
                  },
                  evaluatedAt: {
                    type: 'string',
                    format: 'date-time'
                  }
                }
              },
              submittedAt: {
                type: 'string',
                format: 'date-time',
                default: 'Date.now'
              }
            }
          },
      
          Exhibition: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                required: true
              },
              description: { type: 'string' },
              startDate: {
                type: 'string',
                format: 'date-time',
                required: true
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                required: true
              },
              location: { type: 'string' },
              submissions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    submission: {
                      type: 'string',
                      description: 'Reference to Submission ID'
                    },
                    price: { type: 'number' },
                    status: {
                      type: 'string',
                      enum: ['available', 'sold', 'returned'],
                      default: 'available'
                    },
                    soldPrice: { type: 'number' },
                    soldTo: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        contact: { type: 'string' }
                      }
                    },
                    paymentStatus: {
                      type: 'string',
                      enum: ['pending', 'paid'],
                      default: 'pending'
                    }
                  }
                }
              },
              createdBy: {
                type: 'string',
                description: 'Reference to User ID'
              }
            }
          },
      
          Award: {
            type: 'object',
            properties: {
              competition: {
                type: 'string',
                description: 'Reference to Competition ID',
                required: true
              },
              submission: {
                type: 'string',
                description: 'Reference to Submission ID',
                required: true
              },
              student: {
                type: 'string',
                description: 'Reference to Student User ID',
                required: true
              },
              rank: {
                type: 'string',
                required: true
              },
              prize: {
                type: 'string',
                required: true
              },
              remarks: { type: 'string' },
              awardedBy: {
                type: 'string',
                description: 'Reference to User ID',
                required: true
              },
              awardedAt: {
                type: 'string',
                format: 'date-time',
                default: 'Date.now'
              }
            }
          }
        }
      }
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;