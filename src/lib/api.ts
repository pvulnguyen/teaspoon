import { db } from '@db';

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

export async function getRecipes() {
  const recipes = await db.recipe.findMany({
    where: {
      isPublic: true,
    },
    select: {
      id: true,
      name: true,
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
    orderBy: {
      createdAt: 'desc',
    },
  });

  return recipes;
}

export async function getRecipe(id: string) {
  const recipe = await db.recipe.findUnique({
    where: { id },
    include: {
      categories: {
        select: {
          name: true,
        },
      },
      image: {
        select: {
          url: true,
          fileKey: true,
        },
      },
      ingredients: {
        select: {
          id: true,
          amount: true,
          item: {
            select: {
              name: true,
            },
          },
        },
      },
      instructions: {
        select: {
          id: true,
          position: true,
          text: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  return recipe;
}

export async function getCookbook(userId: string) {
  const cookbook = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      recipes: {
        select: {
          id: true,
          name: true,
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
      savedRecipes: {
        select: {
          id: true,
          name: true,
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
