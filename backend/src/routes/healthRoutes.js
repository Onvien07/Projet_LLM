/**
 * ROUTES HEALTH - NewsPulse Backend
 * Endpoint pour vérifier l'état du serveur
 */

import express from 'express';
import { isDeepseekAvailable } from '../services/llmService.js';
import { SUCCESS_MESSAGES } from '../utils/constants.js';

const router = express.Router();

/**
 * GET /api/health
 * Vérifie l'état du serveur et des services
 */
router.get('/', (req, res) => {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    const healthStatus = {
        success: true,
        status: 'healthy',
        message: SUCCESS_MESSAGES.HEALTH_OK,
        timestamp: new Date().toISOString(),
        uptime: {
            seconds: Math.floor(uptime),
            formatted: formatUptime(uptime),
        },
        memory: {
            used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
            total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        },
        services: {
            deepseek: isDeepseekAvailable() ? 'connected' : 'mock mode',
            news: 'operational',
        },
        environment: process.env.NODE_ENV || 'development',
    };

    res.json(healthStatus);
});

/**
 * Formate le temps d'activité en format lisible
 */
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts = [];
    if (days > 0) parts.push(`${days}j`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${secs}s`);

    return parts.join(' ');
}

export default router;
