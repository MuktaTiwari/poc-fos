// Lightweight logger that avoids console noise in production.
// In development, logs to console for visibility.
// In production, it no-ops by default. You can enhance this to forward to an error tracking service.

type Meta = Record<string, unknown>;

const isDev = process.env.NODE_ENV !== "production";

function format(message: unknown, meta?: Meta): string {
  try {
    const metaStr = meta ? ` | meta: ${JSON.stringify(meta)}` : "";
    return String(message) + metaStr;
  } catch {
    return String(message);
  }
}

export const logger = {
  error(message: unknown, meta?: Meta) {
    if (isDev) console.error(format(message, meta));
  },
  warn(message: unknown, meta?: Meta) {
    if (isDev) console.warn(format(message, meta));
  },
  info(message: unknown, meta?: Meta) {
    if (isDev) console.info(format(message, meta));
  },
  debug(message: unknown, meta?: Meta) {
    if (isDev) console.debug(format(message, meta));
  },
};
