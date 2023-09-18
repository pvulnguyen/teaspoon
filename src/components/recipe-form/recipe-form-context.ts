import { createFormContext } from '@mantine/form';

export interface RecipeFormValues {
  name: string;
  description?: string | undefined;
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
    amount: string;
    name: string;
    key: string;
  }[];
  instructions: {
    position: number | null;
    text: string;
    key: string;
  }[];
}

export const [RecipeFormProvider, useRecipeFormContext, useRecipeForm] = createFormContext<RecipeFormValues>();
