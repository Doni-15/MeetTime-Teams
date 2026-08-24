import { getClientOrigin } from '../config/runtime.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export function createCookieOriginGuard({
    trustedOrigin = getClientOrigin(),
} = {}) {
    return function requireTrustedCookieOrigin(req, res, next) {
        if (SAFE_METHODS.has(req.method) || !req.cookies?.token) {
            return next();
        }

        if (req.get('origin') !== trustedOrigin) {
            return res.status(403).json({
                message: 'Request lintas situs ditolak',
            });
        }

        return next();
    };
}

export const requireTrustedCookieOrigin = createCookieOriginGuard();
