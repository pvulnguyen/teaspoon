export { RecipeForm } from './recipe-form';

export type RecipeFormData = {
  name: string;
  description: string;
  categories: string[];
  prepTime: string;
  cookTime: string;
  yield: string;
  image: {
    fileKey: string;
    url: string;
  };
  ingredients: {
    amount: string;
    name: string;
    key: string;
  }[];
  instructions: {
    position: number;
    text: string;
    key: string;
  }[];
};
