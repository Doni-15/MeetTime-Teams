import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import krsRoutes from './routes/krsRoutes.js';
import agendaRoutes from './routes/agendaRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json()); 
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/krs', krsRoutes);
app.use('/agenda', agendaRoutes);
app.use('/groups', groupRoutes);
app.use('/chat', chatRoutes);

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

export default app;