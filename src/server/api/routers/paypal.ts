import { z } from "zod";

import axios, { AxiosError } from "axios";
import { randomUUID } from "crypto";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { getAuthAssertionValue } from "@/utils";
import { TRPCClientError } from "@trpc/client";
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
                    const response = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, data, config)
                    const access_token = response.data.access_token;
                    console.log(access_token)
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
                const BN_CODE = process.env.BN_CODE
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
                            "return_url": "https://bicycle-admin.vercel.app/dashboard/success",
                        }
                    };

                    const paypalApiUrl = `${process.env.PAYPAL_API}/v2/customer/partner-referrals`;

                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ctx.session?.user.paypal_token}`,
                        'Paypal-Partner-Attribution-Id': BN_CODE
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

    onBoardingStatus:
        protectedProcedure
            .input(z.object({
                merchantId: z.string()
            }))
            .query(async ({ ctx, input }) => {
                const BN_CODE = process.env.BN_CODE
                const paypalApiUrl = `${process.env.PAYPAL_API}/v1/customer/partners/${process.env.PAYPAL_ID}/merchant-integrations/${input.merchantId}`;
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ctx.session?.user.paypal_token}`,
                    'Paypal-Partner-Attribution-Id': BN_CODE
                };
                const response = await axios.get(paypalApiUrl, { headers })
                if (response) {
                    const primary_email = response.data.payments_receivable
                    const amount_recievable = response.data.primary_email_confirmed
                    return { primary_email: primary_email, amount_receivable: amount_recievable }
                }
            }),
    deActivateAccount:
        protectedProcedure
            .input(z.object({
                email: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                await ctx.db.seller.delete({
                    where: {
                        email: input.email
                    }
                })
            }),
    makeRefund:
        publicProcedure
            .input(z.object({
                captureId: z.string()
            }))
            .mutation(async ({ ctx, input }) => {
                const BN_CODE = process.env.BN_CODE
                const clientId = process.env.PAYPAL_CLIENT
                const sellerPayerId = process.env.PAYPAL_SELLER_MERCHANT
                if (clientId && sellerPayerId  && input.captureId) {
                    try {
                        const authAssertion = getAuthAssertionValue(clientId, sellerPayerId);
                        const paypalApiUrl = `${process.env.PAYPAL_API}/v2/payments/captures/${input.captureId}/refund`;
                        const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${ctx.session?.user.paypal_token}`,
                            'PayPal-Auth-Assertion': authAssertion,
                            'Paypal-Partner-Attribution-Id': BN_CODE
                        };
                        axios.post(paypalApiUrl, {}, { headers })
                            .then((response) => console.log(response.data))
                            .catch((error: AxiosError) => console.log(error.response?.data))
                        return
                    } catch (error) {
                        throw new TRPCClientError("Can't refund something went wrong")
                    }
                }
                throw new TRPCClientError("Can't refund something went wrong")
            }),
});
