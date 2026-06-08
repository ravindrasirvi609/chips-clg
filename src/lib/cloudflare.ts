import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const publicBaseUrl =
  process.env.CLOUDFLARE_R2_PUBLIC_URL ||
  process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL;

function requireCloudflareConfig() {
  const missing = [
    ["CLOUDFLARE_ACCOUNT_ID", accountId],
    ["CLOUDFLARE_R2_ACCESS_KEY_ID", accessKeyId],
    ["CLOUDFLARE_R2_SECRET_ACCESS_KEY", secretAccessKey],
    ["CLOUDFLARE_R2_BUCKET_NAME", bucketName],
    ["CLOUDFLARE_R2_PUBLIC_URL", publicBaseUrl],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing Cloudflare R2 configuration: ${missing.join(", ")}`
    );
  }
}

function getCloudflareClient() {
  requireCloudflareConfig();

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId as string,
      secretAccessKey: secretAccessKey as string,
    },
  });
}

function normalizePublicBaseUrl() {
  return (publicBaseUrl as string).replace(/\/+$/, "");
}

export function sanitizeStorageFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function sanitizeFolderName(folder: string) {
  return (
    folder
      .trim()
      .replace(/[^a-zA-Z0-9/_-]/g, "-")
      .replace(/\/+/g, "/")
      .replace(/^\/|\/$/g, "") || "uploads"
  );
}

export function getCloudflarePublicUrl(key: string) {
  return `${normalizePublicBaseUrl()}/${encodeURI(key)}`;
}

export async function uploadBufferToCloudflare(
  buffer: Buffer,
  key: string,
  contentType = "application/octet-stream"
) {
  const client = getCloudflareClient();

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName as string,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return getCloudflarePublicUrl(key);
}

export async function uploadFileToCloudflare(file: File, folder = "abstracts") {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const safeName = sanitizeStorageFileName(file.name);
  const safeFolder = sanitizeFolderName(folder);
  const key = `${safeFolder}/${Date.now()}-${file.size}-${safeName}`;

  return uploadBufferToCloudflare(
    buffer,
    key,
    file.type || "application/octet-stream"
  );
}

export async function uploadQRCodeToCloudflare(
  qrCodeBuffer: Buffer,
  fileName: string
): Promise<string> {
  const safeName = sanitizeStorageFileName(fileName);
  return uploadBufferToCloudflare(
    qrCodeBuffer,
    `qr-codes/${safeName}`,
    "image/png"
  );
}
