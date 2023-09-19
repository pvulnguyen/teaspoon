import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/db';

export async function getCookbook() {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');

  const cookbook = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      recipes: {
        select: {
          id: true,
          name: true,
          description: true,
          categories: {
            select: {
              name: true,
            },
          },
          image: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  });

  return cookbook;
}
