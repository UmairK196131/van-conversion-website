import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from './prisma.js';
import { config } from '../config/env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, '../../uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const useCloudinary = Boolean(process.env.CLOUDINARY_URL);

if (useCloudinary) {
  cloudinary.config({ secure: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    cb(null, unique);
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

async function uploadToCloudinary(filePath, filename) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'van-conversion',
    public_id: path.parse(filename).name,
  });
  fs.unlinkSync(filePath);
  return result.secure_url;
}

function getLocalUrl(filename) {
  const base = config.apiBaseUrl || `http://localhost:${config.port}`;
  return `${base}/uploads/${filename}`;
}

export async function processUpload(file) {
  let url;

  if (useCloudinary) {
    url = await uploadToCloudinary(file.path, file.filename);
  } else {
    url = getLocalUrl(file.filename);
  }

  const media = await prisma.media.create({
    data: {
      filename: file.originalname,
      url,
      mimeType: file.mimetype,
      size: file.size,
    },
  });

  return media;
}
