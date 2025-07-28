export const getEnv = (key) => {
  // Only use import.meta.env if we're running in Vite
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
    return process.env[key];
  }
  try {
    // This will throw in Jest, but that's fine because we want process.env in Jest
    // eslint-disable-next-line no-undef
    return import.meta.env[key];
  } catch {
    return process.env[key];
  }
};
