'use client';

import { createFormContext } from '@mantine/form';

export type RecipeFormValues = {
  name: string;
  description: string | null;
  isPublic: boolean;
  prepTime: string;
  cookTime: string;
  yield: string;
  categories: string[];
  image: {
    url: string;
    fileKey: string;
  };
  ingredients: {
    id: string;
    amount: string;
    name: string;
    key: string;
  }[];
  instructions: {
    id: string;
    position: number | null;
    text: string;
    key: string;
  }[];
}

export const [RecipeFormProvider, useRecipeFormContext, useRecipeForm] = createFormContext<RecipeFormValues>();
