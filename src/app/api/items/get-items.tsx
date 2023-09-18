import { db } from '@/db';

export async function getItems() {
  const items = await db.item.findMany({
    select: {
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return items;
}
