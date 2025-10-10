// Centralized environment helpers for client/server-safe base URL access

/**
 * Returns the normalized backend base URL (without trailing slash) or null if not set.
 */
export function getBackendBase(): string | null {
  const raw = process.env.NEXT_PUBLIC_BACKEND_API_URL?.trim();
  if (!raw) return null;
  // Remove any trailing slashes for consistent concatenation
  return raw.replace(/\/+$/, "");
}

/**
 * Returns the backend base URL or throws with a helpful error if missing.
 * Use this in places where you must have a backend URL to proceed.
 */
export function requireBackendBase(): string {
  const base = getBackendBase();
  if (!base) {
    const msg =
      "Missing NEXT_PUBLIC_BACKEND_API_URL. Please set it in your environment (.env.local) to a valid backend base URL";
    // Log once for visibility in both server and client environments
    // Do not attempt a fallback to avoid accidental requests to 'undefined/...'
    // Call sites should catch errors and surface user-friendly messages as needed.
    // Use centralized logger to avoid console noise in production
    try {
      // Dynamically import to avoid circular deps if any
      // and to keep this file tree-shake friendly
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { logger } = require("./logger");
      logger.error(msg);
    } catch {
      // Fallback in case logger import fails
      // eslint-disable-next-line no-console
      console.error(msg);
    }
    throw new Error(msg);
  }
  return base;
}
