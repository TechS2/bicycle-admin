import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db'
import { sellerRouter } from '@/server/api/routers/registration';




export async function POST(req: NextRequest, _res: NextResponse) {

  //* Process the webhook data
  if (!req.body)
    return NextResponse.json({ message: "Error" })

  const data: ReadableStream = req.body
  const readibleData = await data.getReader().read()
  const textDecoder = new TextDecoder('utf-8');
  const jsonString = textDecoder.decode(readibleData.value);
  const jsonObject = JSON.parse(jsonString);
  console.log(jsonObject)
  // Update data according to   the webhook data
  switch (jsonObject.event_type) {
    case 'MERCHANT.ONBOARDING.COMPLETED':
      await db.seller.create({
        data: {
          trackingId: jsonObject.resource.tracking_id,
          merchantId: jsonObject.resource.merchant_id,
          partner_client_id: jsonObject.resource.partner_client_id
        }
      })
      break
    case "MERCHANT.PARTNER-CONSENT.REVOKED":
      break
    case "CHECKOUT.ORDER.APPROVED":
      break
    case "CHECKOUT.ORDER.COMPLETED":
      await db.order.update({
        where:{
          captureId:jsonObject.resource.id
        },
        data:{
          paymentEmail:jsonObject.resource.payer.email_address,
          payerId:jsonObject.resource.payer.payer_id,
          paymentId:jsonObject.resource.purchase_units.payments.captures.id,
          status:true
        }
      })
      break
    default:
      console.log(`Unhandled webhook event type: ${jsonObject.event_type}`);
  }

  // Respond to the webhook
  return NextResponse.json({ status: 'webhook received' });
}
