import { put } from "@vercel/blob";

const token = process.env.BLOB_READ_WRITE_TOKEN || process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN;

export default async function sendImage(file: File): Promise<string | null> {
  try {
    const newBlob = await put(file.name, file, {access: "public", token })

    return newBlob.url;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    return null;
  }
}

