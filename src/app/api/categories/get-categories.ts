import { db } from '@/db';

export async function getCategories() {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return categories;
}
