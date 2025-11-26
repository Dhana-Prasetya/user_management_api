import express from 'express';
import { register, login } from '../controllers/authController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RegisterApiResponse'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "User registered"
 *                     user:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *
 *       400:
 *         description: Bad request - Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid email format"
 *
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.post('/register', register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/RegisterApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         token:
 *                           type: string
 *                           description: JWT authentication token
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                         refreshToken:
 *                           type: string
 *                           description: JWT refresh token
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                         user:
 *                           $ref: '#/components/schemas/User'
 *
 *       403:
 *         description: Forbidden - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Email is invalid"
 *
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.post('/login', login);

export default router;