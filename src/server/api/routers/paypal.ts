import { z } from "zod";

import axios from "axios";
import { randomUUID } from "crypto";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
export const paypalRouter = createTRPCRouter({

    getAuthToken:
        publicProcedure
            .query(async () => {
                const username = process.env.PAYPAL_CLIENT;
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
            .mutation( async ({ ctx }) => {
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
                            "return_url": "http://localhost:3000/dashboard/success",
                        }

                    };

                    const paypalApiUrl = 'https://api-m.sandbox.paypal.com/v2/customer/partner-referrals';

                    const headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${ctx.session?.user.paypal_token}`,
                    };
                     const response = await axios.post(paypalApiUrl, data, { headers })
                    await ctx.db.seller.create({
                        data: {
                            merchantId: '',
                            trackingId: id,
                            status: false
                        }
                    })
                    const url = response.data.links?.find((link: { rel: string; }) => link?.rel === 'action_url').href
                    return url
                } catch (error) {
                    console.error("Error in fetching parter refernal")
                    throw error
                }
            }),

    updateSellerInfo:
        publicProcedure
            .input(
                z.object({
                    trackingId: z.string(),
                    merchantId: z.string()
                }))
            .mutation(async ({ ctx, input }) => {
                await ctx.db.seller.update({
                    where: {
                        trackingId: input.trackingId,
                    },
                    data: {
                        merchantId: input.merchantId,
                        status: true,
                    },
                })
            }),
    
    getStatus:
        protectedProcedure
        .query(async ({ctx})=>{

            const response =  await ctx.db.seller.findMany({
                where:{
                    status:true,
                }
            })

            if(response && response.length!=0)
                return response
            return null
        })
});
