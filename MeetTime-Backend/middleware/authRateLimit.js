import { rateLimit } from 'express-rate-limit';

const commonOptions = {
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        message: 'Terlalu banyak percobaan. Silakan coba lagi beberapa saat lagi.',
    },
};

export const loginRateLimit = rateLimit({
    ...commonOptions,
    skipSuccessfulRequests: true,
});
export const registerRateLimit = rateLimit({
    ...commonOptions,
    limit: 5,
    skipSuccessfulRequests: false,
});
