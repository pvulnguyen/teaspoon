import { db } from '@/db';

export async function getCategories() {
  const categories = await db.category.findMany({
    select: {
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return categories;
}
