/**
 * @statics
 */

const VISA_DEV_MERCHANT_ID = '456879852'

export interface initialConfig {
    production: boolean
    // Development
    VISA_DEV_MERCHANT_ID: string
    VISA_DEV_USER: string
    VISA_DEV_PWD: string
    VISA_DEV_URL_SECURITY: string
    VISA_DEV_URL_SESSION: string
    VISA_DEV_URL_JS: string
    VISA_DEV_URL_AUTHORIZATION: string
    // Production
    VISA_PROD_MERCHANT_ID: string
    VISA_PROD_USER: string
    VISA_PROD_PWD: string
    VISA_PROD_URL_SECURITY: string
    VISA_PROD_URL_SESSION: string
    VISA_PROD_URL_JS: string
    VISA_PROD_URL_AUTHORIZATION: string
    proxy_url?: string
    logo?: string
    responseUrl?: string
}

export const initial: initialConfig = {
    production: false,
    VISA_DEV_MERCHANT_ID: VISA_DEV_MERCHANT_ID,
    VISA_DEV_USER: 'integraciones@niubiz.com.pe',
    VISA_DEV_PWD: '_7z3@8fF',
    VISA_DEV_URL_SECURITY: 'https://apisandbox.vnforappstest.com/api.security/v1/security',
    VISA_DEV_URL_SESSION: `https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/`,
    VISA_DEV_URL_JS: 'https://static-content-qas.vnforapps.com/env/sandbox/js/checkout.js',
    VISA_DEV_URL_AUTHORIZATION: `https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/`,
    VISA_PROD_MERCHANT_ID: '',
    VISA_PROD_USER: '',
    VISA_PROD_PWD: '',
    VISA_PROD_URL_SECURITY: 'https://apiprod.vnforapps.com/api.security/v1/security',
    VISA_PROD_URL_SESSION: `https://apiprod.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/`,
    VISA_PROD_URL_JS: 'https://static-content.vnforapps.com/v2/js/checkout.js',
    VISA_PROD_URL_AUTHORIZATION: `https://apiprod.vnforapps.com/api.authorization/v3/authorization/ecommerce/`,
    proxy_url: 'https://app.blocmin.com/api/capture_pay',
    logo: 'https://i.ibb.co/1JtQKJNk/logo-with.png',
    responseUrl: '/'
}

interface antifraudConfig {
    clientIp: string,
    merchantDefineData: {
        MDD4: string,
        MDD21: number,
        MDD32: string,
        MDD75: string,
        MDD77: number
    }
}

export interface paymentConfig {
    amount: number,
    antifraud: antifraudConfig,
    channel: string
}

export const payment: paymentConfig = {
    amount: 0,
    antifraud: {
        clientIp: '',
        merchantDefineData: {
            MDD4: '',
            MDD21: 0,
            MDD32: '',
            MDD75: '',
            MDD77: 0
        }
    },
    channel: 'web'
}