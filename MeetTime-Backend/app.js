import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { getClientOrigin, getTrustProxyHops } from './config/runtime.js';
import { requireTrustedCookieOrigin } from './middleware/csrfOrigin.js';

import authRoutes from './routes/authRoutes.js';
import krsRoutes from './routes/krsRoutes.js';
import agendaRoutes from './routes/agendaRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

app.use(cors({
    origin: getClientOrigin(),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.set('trust proxy', getTrustProxyHops());

app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use(requireTrustedCookieOrigin);

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
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.status(statusCode).json({
        message: isProduction && statusCode >= 500
            ? 'Terjadi kesalahan pada server'
            : err.message,
        stack: isProduction ? undefined : err.stack,
    });
});

export default app;
