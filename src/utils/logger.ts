/**
 * Safe logging utility that only logs in development mode.
 * This ensures no sensitive error details leak to production console.
 */

export const logger = {
  error: (message: string, error?: unknown) => {
    if (import.meta.env.DEV) {
      console.error(message, error);
    }
    // In production, errors could be sent to a logging service
    // but are never exposed in client console
  },

  warn: (message: string, data?: unknown) => {
    if (import.meta.env.DEV) {
      console.warn(message, data);
    }
  },

  info: (message: string, data?: unknown) => {
    if (import.meta.env.DEV) {
      console.info(message, data);
    }
  },

  debug: (message: string, data?: unknown) => {
    if (import.meta.env.DEV) {
      console.debug(message, data);
    }
  },
};

/**
 * Validates a webhook URL for security.
 * - Must be HTTPS in production
 * - Must be a valid URL format
 * - Prevents obvious malicious patterns
 */
export const validateWebhookUrl = (url: string): { valid: boolean; error?: string } => {
  if (!url || url.trim() === '') {
    return { valid: false, error: 'URL não pode estar vazia' };
  }

  try {
    const parsed = new URL(url);

    // In production, only allow HTTPS
    if (import.meta.env.PROD && parsed.protocol !== 'https:') {
      return { valid: false, error: 'URL deve usar HTTPS em produção' };
    }

    // Must be HTTP or HTTPS
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: 'URL deve usar protocolo HTTP ou HTTPS' };
    }

    // Block localhost/internal IPs in production (basic SSRF protection)
    if (import.meta.env.PROD) {
      const hostname = parsed.hostname.toLowerCase();
      const blockedPatterns = [
        'localhost',
        '127.0.0.1',
        '0.0.0.0',
        '169.254.',
        '10.',
        '192.168.',
        '172.16.',
        '172.17.',
        '172.18.',
        '172.19.',
        '172.20.',
        '172.21.',
        '172.22.',
        '172.23.',
        '172.24.',
        '172.25.',
        '172.26.',
        '172.27.',
        '172.28.',
        '172.29.',
        '172.30.',
        '172.31.',
      ];

      for (const pattern of blockedPatterns) {
        if (hostname === pattern || hostname.startsWith(pattern)) {
          return { valid: false, error: 'URL não pode apontar para endereços internos' };
        }
      }
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'URL inválida' };
  }
};
