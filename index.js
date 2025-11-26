import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import { set } from 'zod';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.BACKEND_RUNNING_PORT || 5000;

// Security middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

async function setupSwagger() {
    
    try {
        // Import the default export from swagger-ui-express and the generated specs
        const { default: swaggerUi } = await import('swagger-ui-express');
        const { default: specs } = await import('./src/config/swagger.js');

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
            explorer: true,
            customCss: '.swagger-ui.topbar { display: none}',
            customSiteTitle: "User Management API Docs"
        }));

        console.log(`Swagger docs available at: http://localhost:${port}/api-docs`);

    } catch (err) {
        console.error('Swagger setup failed.', err);
    }
}

setupSwagger();

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the User Management API',
        documentation: '/api-docs'

    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});