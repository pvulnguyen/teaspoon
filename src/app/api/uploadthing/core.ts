import type { FileRouter } from 'uploadthing/next';

import { auth } from '@clerk/nextjs';
import { createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export const fileRouter = {
  recipeImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      const { userId } = auth();
      if (!userId) throw new Error('Unauthorized');
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.url);
    }),
} satisfies FileRouter;

export type ImageUploadRouter = typeof fileRouter;
