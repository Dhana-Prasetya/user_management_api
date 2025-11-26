import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'API documentation for User Management API application',
            contact: {
                name: 'Dhana',
                email: 'dhana@example.com'
            }
        },
        servers: [
            {
                url: `http://localhost:${process.env.BACKEND_RUNNING_PORT || 5000}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: { // These schemas will be used on swagger jsdoc in specific routes
                Product: {
                    type: 'object',
                    required: ['name', 'stock', 'price'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Product ID',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            description: 'Product name',
                            example: 'Laptop Gaming'
                        },
                        stock: {
                            type: 'integer',
                            description: 'Product stock quantity',
                            example: 10
                        },
                        price: {
                            type: 'number',
                            description: 'Product price',
                            example: 15000000
                        },
                        photo: {
                            type: 'string',
                            description: 'Product photo URL',
                            example: 'https://res.cloudinary.com/example/image.jpg'
                        },
                        description: {
                            type: 'string',
                            description: 'Product description',
                            example: 'High performance gaming laptop'
                        }
                    }
                },
                User: {
                    type: 'object',
                    required: ['email', 'password', 'username'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'User ID',
                            example: '550e8400-e29b-41d4-a716-446655440000'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email',
                            example: 'bahlil@sdm.com'
                        },
                        username: {
                            type: 'string',
                            description: 'User username',
                            example: 'Bahlil'
                        },
                    }
                },
                UserRegister: {
                    type: 'object',
                    required: ['email', 'password', 'fullname'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email',
                            example: 'bahlil@sdm.com'
                        },
                        username: {
                            type: 'string',
                            description: 'User username',
                            example: 'Bahlil'
                        },
                        password: {
                            type: 'string',
                            minLength: 6,
                            description: 'User password',
                            example: '123456'
                        },
                    }
                },
                UserLogin: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email',
                            example: 'bahlil@sdm.com'
                        },
                        password: {
                            type: 'string',
                            description: 'User password',
                            example: '123456'
                        }
                    }
                },
                RegisterApiResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Operation successful'
                        },
                        user: {
                            type: 'object',
                            description: 'Response data'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Error message'
                        }
                    }
                }
            }
        }
    },
    // Path to the API routes files. Use an absolute glob relative to the project root
    apis: [path.join(process.cwd(), 'src', 'routes', '*.js')],
};

const specs = swaggerJSDoc(options);

export default specs;