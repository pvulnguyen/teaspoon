import type { NextRequest } from 'next/server';
import type { RecipeFormValues } from '@/components/recipe-form';

import { NextResponse } from 'next/server';

import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';

import { db } from '@/db';

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = userId ? await clerkClient.users.getUser(userId) : null;
  
  try {
    const data: RecipeFormValues = await request.json();
    const result = await db.recipe.create({
      data: {
        isPublic: data.isPublic,
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
            position: instruction.position!,
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
