'use client';

import type { ImageUploadRouter } from '@/app/api/uploadthing/core';
import type { RecipeFormValues } from './recipe-form-context';

import { useRouter } from 'next/navigation';

import { ActionIcon, Button, MultiSelect, NumberInput, Text, TextInput } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { UploadButton } from '@uploadthing/react';

import { TrashIcon } from '../icons';
import { RecipeFormProvider, useRecipeForm } from './recipe-form-context';
import styles from './recipe-form.module.css';
import { SelectOrCreate } from './select-or-create';

const initialValues = {
  name: '',
  description: '',
  isPublic: false,
  categories: [],
  prepTime: '',
  cookTime: '',
  yield: '',
  image: { url: '', fileKey: '' },
  ingredients: [{ name: '', amount: '', key: randomId() }],
  instructions: [{ position: null, text: '', key: randomId() }],
};

export function RecipeForm({ categories, items }: { categories: string[]; items: string[] }) {
  const form = useRecipeForm({ initialValues });

  const router = useRouter();
  const handleSubmit = async (values: RecipeFormValues) => {
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        const { recipeId } = await res.json();
        showNotification({
          title: 'Success',
          message: 'Recipe saved',
          color: 'green',
        });
        form.reset();
        router.push(`/recipes/${recipeId}`);
      } else {
        const { message } = await res.json();
        showNotification({
          title: 'Error',
          message,
          color: 'red',
        });
      }
    } catch (e) {
      console.error(e);
      showNotification({
        title: 'Error',
        message: 'Something went wrong',
        color: 'red',
      });
    }
  };

  return (
    <RecipeFormProvider form={form}>
      <form className={styles.stack} onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <section>
          <h2>Details</h2>
          <div className={styles.stack}>
            <TextInput label='Name' placeholder='Recipe name' {...form.getInputProps('name')} />
            <TextInput
              label='Description'
              placeholder='Recipe description'
              {...form.getInputProps('description')}
            />
            <MultiSelect
              label='Categories'
              placeholder='Select one or more categories'
              data={categories}
              {...form.getInputProps('categories')}
            />
            <div className={styles.row}>
              <TextInput
                label='Prep Time'
                placeholder='Prep time'
                w='100%'
                {...form.getInputProps('prepTime')}
              />
              <TextInput
                label='Cook Time'
                placeholder='Cook time'
                w='100%'
                {...form.getInputProps('cookTime')}
              />
            </div>
            <TextInput label='Yield' placeholder='Yield' {...form.getInputProps('yield')} />
          </div>
        </section>
        <section>
          <h2>Ingredients</h2>
          <ul className={styles.list}>
            {form.values.ingredients.map((ingredient, index) => (
              <li className={styles.row} key={ingredient.key}>
                <TextInput
                  placeholder='Amount'
                  {...form.getInputProps(`ingredients.${index}.amount`)}
                />
                <SelectOrCreate
                  index={index}
                  items={items}
                  {...form.getInputProps(`ingredients.${index}.name`)}
                />
                <ActionIcon
                  variant='light'
                  color='red'
                  size='lg'
                  onClick={() => form.removeListItem('ingredients', index)}
                >
                  <TrashIcon />
                </ActionIcon>
              </li>
            ))}
          </ul>
          <Button
            variant='light'
            w='100%'
            mt='md'
            onClick={() =>
              form.insertListItem('ingredients', { amount: '', name: '', key: randomId() })
            }
          >
            Add Ingredient
          </Button>
        </section>
        <section>
          <h2>Instructions</h2>
          <ul className={styles.list}>
            {form.values.instructions.map((instruction, index) => (
              <li className={styles.row} key={instruction.key}>
                <NumberInput
                  placeholder={`Step ${index + 1}`}
                  {...form.getInputProps(`instructions.${index}.position`)}
                />
                <TextInput
                  placeholder='Text'
                  className={styles.fullW}
                  {...form.getInputProps(`instructions.${index}.text`)}
                />
                <ActionIcon
                  variant='light'
                  color='red'
                  size='lg'
                  onClick={() => form.removeListItem('instructions', index)}
                >
                  <TrashIcon />
                </ActionIcon>
              </li>
            ))}
          </ul>
          <Button
            variant='light'
            w='100%'
            mt='md'
            onClick={() =>
              form.insertListItem('instructions', { position: null, text: '', key: randomId() })
            }
          >
            Add Step
          </Button>
        </section>
        <section>
          <h2>Image</h2>
          <UploadButton<ImageUploadRouter>
            endpoint='recipeImage'
            onClientUploadComplete={(res) => {
              res?.map((file) => {
                form.setFieldValue('image', { url: file.url, fileKey: file.key });
              });
            }}
            onUploadError={(e: Error) => console.log(e.message)}
          />
        </section>
        {!form.values.image.url && (
          <Text size='sm' ta='center'>
            You can save this recipe once you&apos;ve uploaded an image of the finished dish.
          </Text>
        )}
        <Button type='submit' color='green' disabled={!form.values.image.url}>
          Save Recipe
        </Button>
      </form>
    </RecipeFormProvider>
  );
}
