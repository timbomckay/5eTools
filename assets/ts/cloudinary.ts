// Import the Cloudinary class.
import { Cloudinary } from '@cloudinary/url-gen';

// Create a Cloudinary instance and set your cloud name.
export const cld = new Cloudinary({
  cloud: {
    cloudName: 'timbomckay',
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});
