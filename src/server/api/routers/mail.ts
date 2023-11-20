import { type Transporter, createTransport } from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from 'zod'


export const mailRouter = createTRPCRouter({

    //* Send mail when buyer pays for order
    paymentMail:
        publicProcedure
            .input(z.object({
                reciever: z.string()
            }))
            .mutation(async ({ input }) => {
                try {

                    const sender = process.env.ZOHO_MAIL
                    const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
                        host: "smtp.zoho.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: sender,
                            pass: process.env.ZOHO_PASSWORD,
                        },
                    })
                    const email: Mail.Options = {
                        from: `${sender}`,
                        to: `${input.reciever}`,
                        subject: "Seller Registration Done",
                        text: `Hi Seller,
                        Your MultiParty Seller Amount is connected to Paminaz.    
                        `,
                    };
                    await transporter.sendMail(email);
                    return "Success"
                } catch (error) {
                    console.error(error)
                    return "Error"
                }
            }),
})