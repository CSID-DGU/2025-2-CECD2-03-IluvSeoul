const SERVER_DOMAIN = 'http://127.0.0.1:3000/front';

export default {
    SERVER_DOMAIN: import.meta.env.VITE_PROXY_API || SERVER_DOMAIN,
};