const SERVER_DOMAIN = 'http://192.168.0.1:3000';

export default {
    SERVER_DOMAIN: process.env.VUE_APP_PROXY_API || SERVER_DOMAIN,
};