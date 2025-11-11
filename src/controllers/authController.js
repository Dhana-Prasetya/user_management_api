import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as inputValidation from 'zod';

dotenv.config();

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const emailCheck = inputValidation.email();
        const passwordCheck = inputValidation.string().min(6);

        if (!emailCheck.safeParse(email).success) {
            return  res.status(400).json({ message: 'Invalid email format' });
        }

        if (!passwordCheck.safeParse(password).success) {
            return  res.status(400).json({ message: 'Password need to be at least 6 characters long' });
        }

        const dupeCheck = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
        if(dupeCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
        const { rows } = await pool.query(query, [username, email, hashed]);
        res.status(201).json({ message: 'User registered', user: rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        if (!rows.length) return res.status(404).json({ message: 'Email or password incorrect' });

        const valid = await bcrypt.compare(password, rows[0].password);
        if (!valid) return res.status(401).json({ message: 'Email or password incorrect' });

        const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};
