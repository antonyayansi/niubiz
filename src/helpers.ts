import { initial } from "./variables";

const getClientIp = async () => {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error obteniendo IP:", error);
        return "0.0.0.0";
    }
}

export const getDomain = () => {
    const protocolo = window.location.protocol;
    const dominio = window.location.hostname;
    return `${protocolo}//${dominio}`;
}

export const generateSesion = async (token:string, payment: Object) => {
    const sessionData = payment;
    let url = initial.production ? initial.VISA_PROD_URL_SESSION : initial.VISA_DEV_URL_SESSION;
    try {
        const response = await fetch(`${url}${initial.production ? initial.VISA_PROD_MERCHANT_ID : initial.VISA_DEV_MERCHANT_ID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify(sessionData)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Sesión generada:", data);

        return data.sessionKey;
    } catch (error) {
        console.error("Error generando sesión:", error);
        return null;
    }
}

export const generatePurchaseNumber = () => {
    return Date.now().toString().slice(-12);
};