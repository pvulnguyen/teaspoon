import type { RecipeFormValues } from '@components/recipes/recipe-form';

import { NextResponse } from 'next/server';
import { db } from '@db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const recipeId = params.id;
    const data: RecipeFormValues = await request.json();

    await db.ingredient.deleteMany({ where: { recipeId } });
    await db.instruction.deleteMany({ where: { recipeId } });

    const updateRecipe = await db.recipe.update({
      where: { id: recipeId },
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

    return NextResponse.json({ message: `Recipe ${updateRecipe.id} updated` }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 400 });
    } else {
      console.error(e);
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
  }
}
