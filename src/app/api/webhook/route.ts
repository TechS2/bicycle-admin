import {  NextResponse } from 'next/server';
import { db } from '@/server/db'

export async function POST(req: Request, _res: NextResponse) {
  //* Process the webhook data
  if (!req.body)
    return NextResponse.json({ message: "Error" })

  const data: ReadableStream = req.body
  const readibleData = await data.getReader().read()
  const textDecoder = new TextDecoder('utf-8');
  const jsonString = textDecoder.decode(readibleData.value);
  const jsonObject = JSON.parse(jsonString);

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

  return NextResponse.json({ status: 'webhook received' });
}
