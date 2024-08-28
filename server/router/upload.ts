import { procedure, router } from '../trpc';
import { z } from 'zod';
import { sendImage } from '@/util/blobFunctions';
import { Buffer } from 'buffer';

export const uploadRouter = router({
  sendImage: procedure
    .input(z.object({ file: z.string(), filename: z.string() }))
    .mutation(async ({ input }) => {
      const { file, filename } = input;

      const buffer = Buffer.from(file, 'base64');

      const url = await sendImage(buffer, filename);
      return url;
    }),
});
