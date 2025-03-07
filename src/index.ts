import { generatePurchaseNumber, generateSesion, getDomain } from "./helpers";
import { initial, payment } from "./variables";
import type { initialConfig, paymentConfig } from "./variables";

let token: string | null = null;

export const setInitialConfig = (config: initialConfig) => {
    Object.assign(initial, config);
};

export const setPaymentConfig = (config: paymentConfig) => {
    Object.assign(payment, config);
};

async function getVisaSession() {
    const url = initial.production ? initial.VISA_PROD_URL_SECURITY : initial.VISA_DEV_URL_SECURITY;
    const user = initial.production ? initial.VISA_PROD_USER : initial.VISA_DEV_USER;
    const password = initial.production ? initial.VISA_PROD_PWD : initial.VISA_DEV_PWD;

    const headers = new Headers({
        "Accept": "*/*",
        "Authorization": "Basic " + btoa(`${user}:${password}`)
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        token = await response.text();

        const sessionKey = await generateSesion(token, payment);

        return sessionKey;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

const captureSubmit = async (e: Event) => {
    e.preventDefault();

    console.log('Formulario enviado:', e);
}

export const setup = async () => {
    const script = document.createElement("script");
    const frmVisaNet: HTMLFormElement = document.getElementById("frmVisaNet") as HTMLFormElement;

    if (!frmVisaNet) {
        console.error("No se encontró el formulario con id 'frmVisaNet'");
        return;
    }

    frmVisaNet.addEventListener("submit", captureSubmit); // Capturar el submit y prevenir recarga

    const sessionKey: any = await getVisaSession();

    script.src = initial.production ? initial.VISA_PROD_URL_JS : initial.VISA_DEV_URL_JS;
    script.setAttribute("data-sessiontoken", sessionKey);
    script.setAttribute("data-channel", "web");
    script.setAttribute("data-merchantid", initial.production ? initial.VISA_PROD_MERCHANT_ID : initial.VISA_DEV_MERCHANT_ID);
    script.setAttribute("data-merchantlogo", initial.logo ?? "");
    script.setAttribute("data-purchasenumber", generatePurchaseNumber());
    script.setAttribute("data-amount", payment.amount.toString());
    script.setAttribute("data-expirationminutes", "5");
    script.setAttribute("data-timeouturl", '/');

    const params: any = {
        purchaseNumber: script.getAttribute("data-purchasenumber"),
        amount: script.getAttribute("data-amount"),
        responseUrl: `${getDomain()}${initial.responseUrl}`,
        token: token,
        production: initial.production,
        merchantId: script.getAttribute("data-merchantid"),
    }

    const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value?.toString() ?? '')}`)
        .join('&');

    frmVisaNet.action = `${initial.proxy_url}?${queryString}`;
    frmVisaNet.appendChild(script);
}

export const formatResponse = (callback?:any) => {
    const urlParams = new URLSearchParams(window.location.search);

    let paramsObject:any = {};

    urlParams.forEach((value, key) => {
        paramsObject[key] = value;
    });

    const headersAndDataMap = {
        header: {
            ecoreTransactionUUID: paramsObject["header[ecoreTransactionUUID]"] || "",
            ecoreTransactionDate: paramsObject["header[ecoreTransactionDate]"] || "",
            millis: paramsObject["header[millis]"] || ""
        },
        fulfillment: {
            channel: paramsObject["fulfillment[channel]"] || "",
            merchantId: paramsObject["fulfillment[merchantId]"] || "",
            terminalId: paramsObject["fulfillment[terminalId]"] || "",
            captureType: paramsObject["fulfillment[captureType]"] || "",
            countable: paramsObject["fulfillment[countable]"] || "",
            fastPayment: paramsObject["fulfillment[fastPayment]"] || "",
            signature: paramsObject["fulfillment[signature]"] || ""
        },
        order: {
            tokenId: paramsObject["order[tokenId]"] || "",
            purchaseNumber: paramsObject["order[purchaseNumber]"] || "",
            amount: paramsObject["order[amount]"] || "",
            installment: paramsObject["order[installment]"] || "",
            currency: paramsObject["order[currency]"] || "",
            authorizedAmount: paramsObject["order[authorizedAmount]"] || "",
            authorizationCode: paramsObject["order[authorizationCode]"] || "",
            actionCode: paramsObject["order[actionCode]"] || "",
            traceNumber: paramsObject["order[traceNumber]"] || "",
            transactionDate: paramsObject["order[transactionDate]"] || "",
            transactionId: paramsObject["order[transactionId]"] || ""
        },
        dataMap: {
            TERMINAL: paramsObject["dataMap[TERMINAL]"] || "",
            BRAND_ACTION_CODE: paramsObject["dataMap[BRAND_ACTION_CODE]"] || "",
            BRAND_HOST_DATE_TIME: paramsObject["dataMap[BRAND_HOST_DATE_TIME]"] || "",
            TRACE_NUMBER: paramsObject["dataMap[TRACE_NUMBER]"] || "",
            CARD_TYPE: paramsObject["dataMap[CARD_TYPE]"] || "",
            ECI_DESCRIPTION: paramsObject["dataMap[ECI_DESCRIPTION]"] || "",
            SIGNATURE: paramsObject["dataMap[SIGNATURE]"] || "",
            CARD: paramsObject["dataMap[CARD]"] || "",
            MERCHANT: paramsObject["dataMap[MERCHANT]"] || "",
            STATUS: paramsObject["dataMap[STATUS]"] || "",
            INSTALLMENTS_INFO: paramsObject["dataMap[INSTALLMENTS_INFO]"] || "",
            ACTION_DESCRIPTION: paramsObject["dataMap[ACTION_DESCRIPTION]"] || "",
            ID_UNICO: paramsObject["dataMap[ID_UNICO]"] || "",
            AMOUNT: paramsObject["dataMap[AMOUNT]"] || "",
            BRAND_HOST_ID: paramsObject["dataMap[BRAND_HOST_ID]"] || "",
            AUTHORIZATION_CODE: paramsObject["dataMap[AUTHORIZATION_CODE]"] || "",
            YAPE_ID: paramsObject["dataMap[YAPE_ID]"] || "",
            CURRENCY: paramsObject["dataMap[CURRENCY]"] || "",
            TRANSACTION_DATE: paramsObject["dataMap[TRANSACTION_DATE]"] || "",
            ACTION_CODE: paramsObject["dataMap[ACTION_CODE]"] || "",
            CVV2_VALIDATION_RESULT: paramsObject["dataMap[CVV2_VALIDATION_RESULT]"] || "",
            ECI: paramsObject["dataMap[ECI]"] || "",
            ID_RESOLUTOR: paramsObject["dataMap[ID_RESOLUTOR]"] || "",
            BRAND: paramsObject["dataMap[BRAND]"] || "",
            ADQUIRENTE: paramsObject["dataMap[ADQUIRENTE]"] || "",
            QUOTA_AMOUNT: paramsObject["dataMap[QUOTA_AMOUNT]"] || "",
            BRAND_NAME: paramsObject["dataMap[BRAND_NAME]"] || "",
            PROCESS_CODE: paramsObject["dataMap[PROCESS_CODE]"] || "",
            TRANSACTION_ID: paramsObject["dataMap[TRANSACTION_ID]"] || ""
        }
    };

    if (callback) {
        if(urlParams.size == 0){
            return
        }
        if(!headersAndDataMap.dataMap.ACTION_CODE){
            callback({
                code: 400,
                res: "error",
                message: "No se recibió información de la transacción valida"
            });
            return;
        }else{
            callback(headersAndDataMap);
        }
    }
}