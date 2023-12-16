import cloudinary from "@/server/_config/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { NextFunction, Response } from "express-serve-static-core";
import { UploadApiResponse } from "cloudinary";
import { File } from "buffer";


export async function POST(req: NextRequest, res: Response, next: NextFunction) {

  const formData: FormData = await req.formData()

  const file: FormDataEntryValue | null = formData.get('image')
  if (!file)
    return NextResponse.json({ message: "File not provided" }, { status: 400 })

  if (file instanceof File) {

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) {
              console.error('Error uploading to Cloudinary:', error);
              reject(error);
            } else {
              if (result)
                resolve(result);
            }
          }
        ).end(Buffer.from(fileArrayBuffer)); 
      });
      return NextResponse.json({ url: result.secure_url }, { status: 201 })
    } catch (error) {
      return NextResponse.json({ message: "Uploading error" }, { status: 400 })
    }
  }

  return NextResponse.json({ message: "File not Found or corrupted file" }, { status: 401 })
}
