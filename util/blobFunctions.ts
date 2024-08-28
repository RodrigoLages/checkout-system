import { put, del } from "@vercel/blob";

const token = process.env.BLOB_READ_WRITE_TOKEN;

export async function sendImage(buffer: Buffer, filename: string): Promise<string | null> {
  try {
    const newBlob = await put(filename, buffer, {access: "public", token })
    return newBlob.url;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    return null;
  }
}

export async function deleteBlob(url: string | null): Promise<void> {
  if (!url) return console.log("URL não enviada");
  try {
    await del(url, { token });
  } catch (error) {
    console.error("Erro ao deletar a imagem:", error);
  }
}
