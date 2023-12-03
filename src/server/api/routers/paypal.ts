import { z } from "zod";

import axios, { AxiosError } from "axios";
import { randomUUID } from "crypto";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { getAuthAssertionValue } from "@/utils";
import { api } from "@/trpc/server";
export const paypalRouter = createTRPCRouter({

    getAuthToken:
        publicProcedure
            .query(async () => {
                const username = process.env.PAYPAL_CLIENT
                const password = process.env.PAYPAL_SECERT
                const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
                try {
                    const config = {
                        headers: {
                            'Accept': 'application/json',
                            'Accept-Language': 'en_US',
                            'Authorization': `Basic ${base64Credentials}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    };
                    const data = 'grant_type=client_credentials';
                    const response = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', data, config)
                    const access_token = response.data.access_token;
                    return access_token;
                } catch (error) {
                    console.error('Error getting access token:', error);
                    throw error;
                }
            }
            ),

    connectToPayPal:
        protectedProcedure
            .mutation(async ({ ctx }) => {
                const id: string = randomUUID().toString()
                try {
                    const data = {
                        "tracking_id": id,
                        "operations": [
                            {
                                "operation": "API_INTEGRATION",
                                "api_integration_preference": {
                                    "rest_api_integration": {
                                        "integration_method": "PAYPAL",
                                        "integration_type": "THIRD_PARTY",
                                        "third_party_details": {
                                            "features": ["PAYMENT", "REFUND", "PARTNER_FEE", "ACCESS_MERCHANT_INFORMATION"]
                                        }
                                    }
                                }
                            }
                        ],
                        "products": ["EXPRESS_CHECKOUT"],
                        "legal_consents": [
                            {
                                "type": "SHARE_DATA_CONSENT",
                                "granted": true
                            }
                        ],
                        "partner_config_override": {
                            "return_url": "https://96b9-103-103-43-236.ngrok-free.app/dashboard/success",
                        }
                    };

                    const paypalApiUrl = 'https://api-m.sandbox.paypal.com/v2/customer/partner-referrals';

                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ctx.session?.user.paypal_token}`,
                    };
                    const response = await axios.post(paypalApiUrl, data, { headers })
                    const url = response.data.links?.find((link: { rel: string; }) => link?.rel === 'action_url').href
                    return url
                } catch (error) {
                    console.error("Error in fetching parter refernal")
                    throw error
                }
            }),

    createSellerInfo:
        publicProcedure
            .input(
                z.object({
                    trackingId: z.string(),
                    merchantId: z.string(),
                    email: z.any()
                }))
            .mutation(async ({ ctx, input }) => {
                await ctx.db.seller.create({
                    data: {
                        trackingId: input.trackingId,
                        email: input.email,
                        merchantId: "",
                        partner_client_id: ""
                    },
                })
            }),

    getStatus:
        protectedProcedure
            .input(z.object({
                email: z.any()
            }))
            .query(async ({ ctx, input }) => {
                if (!input.email)
                    return false
                const response = await ctx.db.seller.findUnique({
                    where: {
                        email: input.email
                    }
                })
                if (response)
                    return true
                return false
            }),
    makeRefund:
        publicProcedure
            .input(z.object({
                captureId: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                const clientId = process.env.PAYPAL_CLIENT
                const sellerPayerId = process.env.PAYPAL_MERCHANT_ID
                console.log(clientId,sellerPayerId)
                if (clientId && sellerPayerId) {
                    const authAssertion = getAuthAssertionValue(clientId, sellerPayerId);
                    const paypalApiUrl = `${process.env.PAYPAL_URL}/v2/payments/captures/${input.captureId}/refund`;
                    console.log("CaptureId",input.captureId)
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ctx.session?.user.paypal_token}`,
                        'PayPal-Auth-Assertion':authAssertion
                    };
                    axios.post(paypalApiUrl, {}, { headers })
                    .then((response)=>console.log(response.data))
                    .catch((error:AxiosError)=>console.log(error.response?.data))

                }
                return ""
            }),
});
