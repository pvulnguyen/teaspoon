'use client';

import type { ImageUploadRouter } from '@api/uploadthing/core';
import type { RecipeFormValues } from '@context/recipe-form-context';

import { useRouter } from 'next/navigation';

import {
  ActionIcon,
  Button,
  Flex,
  Group,
  MultiSelect,
  NumberInput,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { UploadButton } from '@uploadthing/react';

import { RecipeFormProvider, useRecipeForm } from '@context/recipe-form-context';
import { RecipeProps } from '../recipe';
import { SelectOrCreate } from './select-or-create';

import utils from '@styles/utils.module.css';

interface RecipeFormProps {
  categories: string[];
  items: string[];
  recipe?: RecipeProps;
}

export function RecipeForm({ categories, items, recipe }: RecipeFormProps) {
  const form = useRecipeForm({
    initialValues: {
      name: recipe?.name ?? '',
      description: recipe?.description ?? '',
      isPublic: recipe?.isPublic ?? false,
      categories: recipe?.categories.map((category) => category.name) ?? [],
      prepTime: recipe?.prepTime ?? '',
      cookTime: recipe?.cookTime ?? '',
      yield: recipe?.yield ?? '',
      image: {
        url: recipe?.image?.url ?? '',
        fileKey: recipe?.image?.fileKey ?? '',
      },
      ingredients: recipe?.ingredients.map((ingredient) => ({
        id: ingredient.id,
        amount: ingredient.amount,
        name: ingredient.item.name,
        key: randomId(),
      })) ?? [{ id: '', amount: '', name: '', key: randomId() }],
      instructions: recipe?.instructions ?? [{ id: '', position: null, text: '', key: randomId() }],
    },
  });

  const router = useRouter();
  const handleSubmit = async (values: RecipeFormValues) => {
    if (recipe) {
      try {
        const res = await fetch(`/api/recipes/${recipe.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          showNotification({
            title: 'Success',
            message: 'Recipe saved',
            color: 'green',
          });
          form.reset();
          router.push(`/recipes/${recipe.id}`);
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
    } else {
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
    }
  };

  return (
    <RecipeFormProvider form={form}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <section>
            <Group justify='space-between'>
              <Title order={2}>Details</Title>
              <Switch label='Discoverable' radius='sm' {...form.getInputProps('isPublic')} />
            </Group>
            <div className={utils.stack}>
              <TextInput label='Name' {...form.getInputProps('name')} />
              <TextInput label='Description' {...form.getInputProps('description')} />
              <MultiSelect
                label='Categories'
                data={categories}
                {...form.getInputProps('categories')}
              />
              <Flex gap='md'>
                <TextInput label='Prep Time' w='100%' {...form.getInputProps('prepTime')} />
                <TextInput label='Cook Time' w='100%' {...form.getInputProps('cookTime')} />
              </Flex>
              <TextInput label='Yield' {...form.getInputProps('yield')} />
            </div>
          </section>
          <section>
            <Title order={2} mb='xs'>
              Ingredients
            </Title>
            <ul className={utils.list}>
              {form.values.ingredients.map((ingredient, index) => (
                <li className={utils.group} key={ingredient.key}>
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
                    <IconTrash />
                  </ActionIcon>
                </li>
              ))}
            </ul>
            <Button
              variant='light'
              mt='md'
              fullWidth
              onClick={() =>
                form.insertListItem('ingredients', { amount: '', name: '', key: randomId() })
              }
            >
              Add Ingredient
            </Button>
          </section>
          <section>
            <Title order={2} mb='xs'>
              Instructions
            </Title>
            <ul className={utils.list}>
              {form.values.instructions.map((instruction, index) => (
                <li className={utils.group} key={instruction.key}>
                  <NumberInput
                    placeholder={`Step ${index + 1}`}
                    {...form.getInputProps(`instructions.${index}.position`)}
                  />
                  <TextInput
                    placeholder='Text'
                    w='100%'
                    {...form.getInputProps(`instructions.${index}.text`)}
                  />
                  <ActionIcon
                    variant='light'
                    color='red'
                    size='lg'
                    onClick={() => form.removeListItem('instructions', index)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </li>
              ))}
            </ul>
            <Button
              variant='light'
              mt='md'
              fullWidth
              onClick={() =>
                form.insertListItem('instructions', { position: null, text: '', key: randomId() })
              }
            >
              Add Step
            </Button>
          </section>
          <section>
            <Title order={2}>Photo</Title>
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
        </Stack>
      </form>
    </RecipeFormProvider>
  );
}
