import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db'
import { getServerAuthSession } from '@/server/auth';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';




export async function GET(req: Request, _res: NextResponse){

  const session = await getServerAuthSession()
  const session1 = await getServerSession()
  const session3 = await getSession()
  console.log("1",session)
  console.log("2",session1)
  console.log("3",session3)
  return NextResponse.json({message:"Receive"})
}

export async function POST(req: Request, _res: NextResponse) {

  const session = await getServerAuthSession()
  const session1 = await getServerSession()
  const session3 = await getSession()
  console.log("1",session)
  console.log("2",session1)
  console.log("3",session3)
  //* Process the webhook data
  if (!req.body)
    return NextResponse.json({ message: "Error" })

  const data: ReadableStream = req.body
  const readibleData = await data.getReader().read()
  const textDecoder = new TextDecoder('utf-8');
  const jsonString = textDecoder.decode(readibleData.value);
  const jsonObject = JSON.parse(jsonString);
  console.log(jsonObject.event_type)
  // Update data according to   the webhook data
  switch (jsonObject.event_type) {
    case 'MERCHANT.ONBOARDING.COMPLETED':
      await db.seller.update({
        where:{
          trackingId:jsonObject.resource.tracking_id,
        },
        data: {
          merchantId: jsonObject.resource.merchant_id,
          partner_client_id: jsonObject.resource.partner_client_id,
        }
      })
      break
    case "MERCHANT.PARTNER-CONSENT.REVOKED":
      break
    case "CHECKOUT.ORDER.APPROVED":
      break
    case "CHECKOUT.ORDER.COMPLETED":
      await db.order.update({
        where: {
          captureId: jsonObject.resource.id
        },
        data: {
          paymentEmail: jsonObject.resource.payer.email_address,
          payerId: jsonObject.resource.payer.payer_id,
          paymentId: jsonObject.resource.purchase_units[0].payments.captures[0].id,
          status: true
        }
      })
      break
    default:
      console.log(`Unhandled webhook event type: ${jsonObject.event_type}`);
  }

  // Respond to the webhook
  return NextResponse.json({ status: 'webhook received' });
}
