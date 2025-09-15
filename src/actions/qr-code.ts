"use server";

import { getUser } from "@/utils/user";
import QRCode from "qrcode";
import { FailResponse } from "../../types/custome-response";

/**
 * Generates a QR code from a given URL and returns it as a data URL string.
 * Can be used directly as a server action in a React Server Component.
 * 
 * @param {string} [url] - the image url
 */
// TODO: you might need to strickt the url to be in format https://.../UUID
export async function generateQRCode(url: string): Promise<string> {
    if (!url || url === "") {
        throw new Error("no url provided");
    }
    
    try {
        const userResponse = await getUser();
        if (userResponse instanceof FailResponse) {
            throw new Error("you must be logged in to generate a QR code");
        }

        const qrCodeDataUrl = await QRCode.toDataURL(url, {
            errorCorrectionLevel: "H", // High error correction
            type: "image/png",         // PNG format
            margin: 2,                 // Some margin around QR
            scale: 8                   // Size multiplier
        });

        return qrCodeDataUrl;
    } catch (error) {
        console.error("QR code generation failed:", error);
        throw new Error("Failed to generate QR code");
    }
}
