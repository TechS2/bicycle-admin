import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { contextProps } from '@trpc/react-query/shared';

// export async function POST(request: NextRequest) {
export async function POST(req: NextRequest, _res: NextResponse) {
    if (!req.body)
        return NextResponse.json({ message: 'Error' }, { status: 404 })

    const data: ReadableStream = req.body;
    const readibleData = await data.getReader().read();
    const textDecoder = new TextDecoder('utf-8');
    const jsonString = textDecoder.decode(readibleData.value);
    const jsonObject = JSON.parse(jsonString)

    
    cookies().set({
        name:'calendar_token',
        value:jsonObject.code,
        maxAge: 604800,
        path: '/',
        httpOnly: true,
        sameSite:true,
        secure:true
    })
    console.log("GETING COOKIES",cookies().getAll())
    console.log("cookies setting")
    return Response.json({ message: 'Cookie demo' });
}

export async function GET(req: NextRequest, _res: NextResponse) {
   
    
    return Response.json({ message: 'Cookie GET' });
}