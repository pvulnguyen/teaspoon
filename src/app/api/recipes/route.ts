import type { RecipeFormData } from '@/components/recipe-form';

import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/db';

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const data: RecipeFormData = await request.json();
    const result = await db.recipe.create({
      data: {
        name: data.name,
        description: data.description,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        yield: data.yield,
        image: {
          create: {
            fileKey: data.image.fileKey,
            url: data.image.url,
          },
        },
        user: {
          connectOrCreate: {
            where: {
              clerkId: user.id,
            },
            create: {
              clerkId: user.id,
              username: user.username!,
            },
          },
        },
        categories: {
          connect: data.categories.map((category) => ({
            name: category,
          })),
        },
        ingredients: {
          create: data.ingredients.map((ingredient) => ({
            key: ingredient.key,
            amount: ingredient.amount,
            item: {
              connectOrCreate: {
                where: {
                  name: ingredient.name,
                },
                create: {
                  name: ingredient.name,
                },
              },
            },
          })),
        },
        instructions: {
          create: data.instructions.map((instruction) => ({
            position: instruction.position,
            text: instruction.text,
            key: instruction.key,
          })),
        },
      },
    });

    return NextResponse.json({ recipeId: result.id }, { status: 201 });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
