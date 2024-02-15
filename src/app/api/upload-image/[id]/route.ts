import {connect} from "@/dbConfig/dbConfig";
import { DeleteImage, UploadImage } from "@/lib/upload-image";
import Images from "@/models/imageSchema";
import { NextRequest, NextResponse } from "next/server";



connect();

export const DELETE = async (req: NextRequest, ctx: { params: { id: string } }) => {

    const imagePublicId = `nextjs-imagegallery` + ctx.params.id;
    const result_delete = await DeleteImage(imagePublicId);
    await Images.findOneAndDelete({ public_id: imagePublicId });

    return NextResponse.json({ message: result_delete}, {
        status: 200,
    })
}


