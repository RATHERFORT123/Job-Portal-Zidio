import { v2 as cloudanary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudanary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECURET, // Click 'View Credentials' below to copy your API secret
});

export default cloudanary;
