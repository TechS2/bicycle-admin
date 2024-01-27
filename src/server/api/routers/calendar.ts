/* eslint-disable @typescript-eslint/no-unsafe-return */
import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import z from 'zod'

import { authClient } from "@/server/_config/oauthClient";
import { calendar } from "@/server/_config/calendar";
import { GaxiosError } from "gaxios";
export const calendarRouter = createTRPCRouter({
    getCalendar:
        publicProcedure
            .query(async ({ ctx }) => {
                try {
                    return await ctx.db.event.findMany()
                } catch (error) {
                    console.log(error)
                }
            }),

    googleOAuth:
        publicProcedure
            .query(({ ctx }) => {
                const scope = ['https://www.googleapis.com/auth/calendar']

                const url = authClient.generateAuthUrl({
                    access_type: "offline",
                    scope: scope
                })
                return url
            }),
    getUserInfo:
        protectedProcedure
            .input(z.object({
                cookie: z.string()
            }))
            .query(async ({ ctx, input }) => {
                try {
                    const response = await authClient.getToken(input.cookie)
                    authClient.setCredentials(response.tokens)
                    return response.tokens
                } catch (error) {
                    if (error instanceof GaxiosError)
                        console.log("Error",error.response?.data)
                    return null
                }
            }),
    createEvent:
        protectedProcedure
            .input(z.object({
                tokens: z.string()
            }))
            .query(async ({ ctx, input }) => {

                try {
                    const event = {
                        'summary': 'Google I/O 2015',
                        'location': '800 Howard St., San Francisco, CA 94103',
                        'description': 'A chance to hear more about Google\'s developer products.',
                        'start': {
                            'dateTime': '2015-05-28T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles',
                        },
                        'end': {
                            'dateTime': '2015-05-28T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles',
                        },
                        'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=2'
                        ],
                        'attendees': [
                            { 'email': 'lpage@example.com' },
                            { 'email': 'sbrin@example.com' },
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 },
                            ],
                        },
                    };
                    // calendar.events.insert({
                    //     calendarId:'primary',     
                    // })
                    authClient.setCredentials(JSON.parse(input.tokens))
                    const now = new Date()
                    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000)

                    const response = await calendar.events.insert({
                        calendarId: 'primary',
                        auth: authClient,
                        requestBody: {
                            summary: "This is a testing event",
                            description: "Testing",
                            start: {
                                dateTime: now.toISOString(),
                                timeZone: "Asia/Karachi"
                            },
                            end: {
                                dateTime: oneDayLater.toISOString(),
                                timeZone: "Asia/Karachi"
                            }
                        }
                    });
                    console.log(response)

                } catch (error) {
                    console.log(error)
                }
            })
})