import {connect} from "@/dbConfig/dbConfig";
import { UploadImage } from "@/lib/upload-image";
import Images from "@/models/imageSchema";
import { NextRequest, NextResponse } from "next/server";



connect();

export const GET = async (req: NextRequest) => {
    const AllImages = await Images.find({})

    return NextResponse.json({ images: AllImages, total: AllImages.length }, {
        status: 200,
    })
}


export async function POST(request: NextRequest) {
    try {
        
        const formData = await request.formData();
        const image = formData.get("image") as unknown as File;
        
        const data: any = await UploadImage(image, "nextjs-imagegallery");
        
        await Images.create({
            image_url: data.secure_url,
            public_id: data.public_id


        });
        // Images.create({ image });


        return NextResponse.json({
            message: data
            
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}