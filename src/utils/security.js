export const SECURITY_CONFIG = {
    PREVENT_CONSOLE_LOGGING: true,
    SENSITIVE_KEYS: ['password', 'token', 'api_key', 'secret'],
    AUTO_LOGOUT_MINUTES: 30,
};

export const setupAutoLogout = (logoutFunction) => {
    let inactivityTimer;
    const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            logoutFunction();
        }, SECURITY_CONFIG.AUTO_LOGOUT_MINUTES * 60 * 1000);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimer, true));
    resetTimer();

    return () => {
        clearTimeout(inactivityTimer);
        events.forEach(event => document.removeEventListener(event, resetTimer, true));
    };
};
