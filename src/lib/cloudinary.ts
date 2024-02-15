import {v2 as cloudinary} from 'cloudinary';
//connecting cloudinary for storing the images in link form which is provided by cloudinary by storing the images on their cloud          
cloudinary.config({ 
  cloud_name: 'CLOUD_NAME', 
  api_key: 'API_KEY', 
  api_secret: 'API_SECRET' 
});

export default cloudinary;