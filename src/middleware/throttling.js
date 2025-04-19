const rateLimit = require('express-rate-limit');

class RequestQueue {
    constructor(maxConcurrent = 1, delayMs = 0) {
        this.queue = [];
        this.maxConcurrent = maxConcurrent;
        this.delayMs = delayMs;
        this.running = 0;
        this.lastRequestTime = 0;
    }

    async add(request) {
        const now = Date.now();
        
        // Jika ada request yang sedang berjalan, tolak request baru
        if (this.running >= this.maxConcurrent) {
            return false;
        }
        
        // Jika belum cukup waktu sejak request terakhir, tolak request
        if (now - this.lastRequestTime < this.delayMs) {
            return false;
        }

        this.running++;
        this.lastRequestTime = now;

        try {
            // Tambahkan delay sebelum memproses request
            await new Promise(resolve => setTimeout(resolve, this.delayMs));
            await request();
            return true;
        } catch (error) {
            console.error('Error processing request:', error);
            return false;
        } finally {
            this.running--;
        }
    }
}

// Throttling untuk API umum (15ms delay, max 1 concurrent)
const generalThrottling = (() => {
    const queue = new RequestQueue(1, 15);
    return async (req, res, next) => {
        try {
            const canProceed = await queue.add(async () => {
                return new Promise((resolve) => {
                    const done = () => {
                        resolve();
                    };
                    res.on('finish', done);
                    res.on('error', done);
                    next();
                });
            });

            if (!canProceed) {
                res.status(429).json({
                    status: 429,
                    message: 'Terlalu banyak request, silakan tunggu sebentar'
                });
            }
        } catch (error) {
            console.error('Error in generalThrottling:', error);
            next(error);
        }
    };
})();

// Throttling untuk API pencarian (50ms delay, max 1 concurrent)
const searchThrottling = (() => {
    const queue = new RequestQueue(1, 50);
    return async (req, res, next) => {
        try {
            const canProceed = await queue.add(async () => {
                return new Promise((resolve) => {
                    const done = () => {
                        resolve();
                    };
                    res.on('finish', done);
                    res.on('error', done);
                    next();
                });
            });

            if (!canProceed) {
                res.status(429).json({
                    status: 429,
                    message: 'Terlalu banyak request pencarian, silakan tunggu sebentar'
                });
            }
        } catch (error) {
            console.error('Error in searchThrottling:', error);
            next(error);
        }
    };
})();

// Throttling untuk API autentikasi (200ms delay, max 1 concurrent)
const authThrottling = (() => {
    const queue = new RequestQueue(1, 200);
    return async (req, res, next) => {
        try {
            const canProceed = await queue.add(async () => {
                return new Promise((resolve) => {
                    const done = () => {
                        resolve();
                    };
                    res.on('finish', done);
                    res.on('error', done);
                    next();
                });
            });

            if (!canProceed) {
                res.status(429).json({
                    status: 429,
                    message: 'Terlalu banyak percobaan login, silakan tunggu sebentar'
                });
            }
        } catch (error) {
            console.error('Error in authThrottling:', error);
            next(error);
        }
    };
})();

// Throttling untuk API yang membutuhkan resource tinggi (500ms delay, max 1 concurrent)
const heavyOperationThrottling = (() => {
    const queue = new RequestQueue(1, 500);
    return async (req, res, next) => {
        try {
            const canProceed = await queue.add(async () => {
                return new Promise((resolve) => {
                    const done = () => {
                        resolve();
                    };
                    res.on('finish', done);
                    res.on('error', done);
                    next();
                });
            });

            if (!canProceed) {
                res.status(429).json({
                    status: 429,
                    message: 'Terlalu banyak request untuk operasi berat, silakan tunggu sebentar'
                });
            }
        } catch (error) {
            console.error('Error in heavyOperationThrottling:', error);
            next(error);
        }
    };
})();

module.exports = {
    generalThrottling,
    searchThrottling,
    authThrottling,
    heavyOperationThrottling
}; 