import type { NextRequest } from 'next/server';
import type { RecipeFormValues } from '@components/recipes/recipe-form';

import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { db } from '@db';

export async function POST(request: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data: RecipeFormValues = await request.json();
    const result = await db.recipe.create({
      data: {
        isPublic: data.isPublic,
        name: data.name,
        description: data.description,
        prepTime: data.prepTime === '' ? 'No prep time required' : data.prepTime,
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
              clerkId: user!.id,
            },
            create: {
              clerkId: user!.id,
              // A username is required at sign up.
              username: user!.username!,
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
            id: ingredient.id,
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
            id: instruction.id,
            position: Number(instruction.position),
            text: instruction.text,
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
