import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { requestLogger } from './middleware/logger.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const frontendUrl = process.env.FRONTEND_URL;
app.use(cors({
    origin: frontendUrl ? (frontendUrl.endsWith('/') ? frontendUrl.slice(0, -1) : frontendUrl) : '*'
}));

// Logger middleware
app.use(requestLogger);

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Day 1 Basic Routes
app.get('/', (req, res) => {
    res.send('Welcome to Nexus Community Hub API');
});

app.get('/about', (req, res) => {
    res.send('Nexus Community Hub: A platform for developers to connect, collaborate, and grow.');
});

app.get('/api/time', (req, res) => {
    res.json({
        currentTime: new Date().toISOString(),
        timestamp: Date.now()
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
