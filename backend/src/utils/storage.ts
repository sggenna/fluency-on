/**
 * Cloudflare R2 (S3-compatible) storage.
 * When R2 env vars are set, uploads go here instead of local disk.
 * Cheaper than S3, no egress fees – good for video and course content.
 */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;
const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, ''); // base URL for public access (e.g. https://pub-xxx.r2.dev or custom domain)

export function isR2Configured(): boolean {
  return !!(accountId && accessKeyId && secretAccessKey && bucketName && publicUrl);
}

let s3Client: S3Client | null = null;

function getR2Client(): S3Client {
  if (!s3Client) {
    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error('R2 credentials not configured');
    }
    s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  return s3Client;
}

/**
 * Upload a file to R2. Returns the public URL of the object.
 */
export async function uploadToR2(
  key: string,
  body: Buffer,
  contentType?: string
): Promise<string> {
  const client = getR2Client();
  if (!bucketName) throw new Error('R2_BUCKET_NAME not set');

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType || 'application/octet-stream',
    })
  );

  return `${publicUrl}/${key}`;
}

/**
 * Build the storage key (path) for an uploaded file. Keeps a simple folder structure.
 */
export function getR2Key(originalName: string, prefix = 'uploads'): string {
  const safe = Buffer.from(originalName, 'latin1')
    .toString('utf8')
    .replace(/[^a-zA-Z0-9._-]/g, '_');
  return `${prefix}/${Date.now()}-${safe}`;
}

export function getR2PublicUrl(key: string): string {
  return `${publicUrl}/${key}`;
}
