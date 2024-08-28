import { del } from "@vercel/blob";

const token = process.env.BLOB_READ_WRITE_TOKEN || process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN;

export default async function deleteBlob(url: string | null): Promise<void> {
  if (!url) return console.log("URL não enviada");
  try {
    await del(url, { token });
  } catch (error) {
    console.error("Erro ao deletar a imagem:", error);
  }
}
