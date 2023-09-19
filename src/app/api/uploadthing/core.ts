import type { FileRouter } from 'uploadthing/next';

import { currentUser } from '@clerk/nextjs';
import { createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export const fileRouter = {
  recipeImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new Error('Unauthorized');
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.url);
    }),
} satisfies FileRouter;

export type ImageUploadRouter = typeof fileRouter;