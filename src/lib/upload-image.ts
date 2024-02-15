import cloudinary from "./cloudinary";

//Streaming the images 
export const UploadImage = async (file: File, folder: string) => {

    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer)
   return  new Promise(async (resolve, reject) => {
        cloudinary.uploader.upload_stream({//streaming 
            resource_type: 'auto',
            folder:folder
        }, async (err, result) => {
            if (err) {
                return reject(err.message);
            }
            return resolve(result)
         }).end(bytes)
     })
}



//Deleting the particular image using public id
export const DeleteImage = async (public_id: string) => {

    return new Promise(async(resolve, reject) => {
        try {
            //destroying that image from cloudinary
            const result = await cloudinary.uploader.destroy(public_id);
            return resolve(result);
        } catch (error:any) {
            reject(new Error(error.message));
        }
    })
}