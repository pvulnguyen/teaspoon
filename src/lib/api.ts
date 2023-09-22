export interface RecipePreview {
  id: string;
  name: string;
  image: { url: string };
  categories: { name: string }[];
}
