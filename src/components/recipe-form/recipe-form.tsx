'use client';

import type { ImageUploadRouter } from '@/app/api/uploadthing/core';
import type { RecipeFormValues } from './recipe-form-context';

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
import { UploadButton } from '@uploadthing/react';

import { TrashIcon } from '../icons';
import { RecipeFormProvider, useRecipeForm } from './recipe-form-context';
import { SelectOrCreate } from './select-or-create';

import utils from '@/styles/utils.module.css';

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
      <form className={utils.stack} onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <section>
          <Group justify='space-between'>
            <Title order={2} size='h3'>Details</Title>
            <Switch label='Discoverable' radius='sm' {...form.getInputProps('isPublic')} />
          </Group>
          <Stack gap='sm'>
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
            <Flex gap='md'>
              <TextInput
                label='Prep Time'
                placeholder='Prep time'
                className={utils.fullW}
                {...form.getInputProps('prepTime')}
              />
              <TextInput
                label='Cook Time'
                placeholder='Cook time'
                className={utils.fullW}
                {...form.getInputProps('cookTime')}
              />
            </Flex>
            <TextInput label='Yield' placeholder='Yield' {...form.getInputProps('yield')} />
          </Stack>
        </section>
        <section>
          <Title order={2} size='h3'>Ingredients</Title>
          <Stack gap='sm'>
            {form.values.ingredients.map((ingredient, index) => (
              <Flex gap='md' key={ingredient.key}>
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
              </Flex>
            ))}
          </Stack>
          <Button
            variant='light'
            mt='md'
            fullWidth
            onClick={() => form.insertListItem('ingredients', { amount: '', name: '', key: randomId() })}
          >
            Add Ingredient
          </Button>
        </section>
        <section>
          <Title order={2} size='h3'>Instructions</Title>
          <Stack gap='sm'>
            {form.values.instructions.map((instruction, index) => (
              <Flex gap='md' key={instruction.key}>
                <NumberInput
                  placeholder={`Step ${index + 1}`}
                  {...form.getInputProps(`instructions.${index}.position`)}
                />
                <TextInput
                  placeholder='Text'
                  className={utils.fullW}
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
              </Flex>
            ))}
          </Stack>
          <Button
            variant='light'
            mt='md'
            fullWidth
            onClick={() => form.insertListItem('instructions', { position: null, text: '', key: randomId() })}
          >
            Add Step
          </Button>
        </section>
        <section>
          <Title order={2} size='h3'>Image</Title>
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
        {!form.values.image.url && <Text size='sm' ta='center'>You can save this recipe once you&apos;ve uploaded an image of the finished dish.</Text>}
        <Button type='submit' color='green' disabled={!form.values.image.url}>Save Recipe</Button>
      </form>
    </RecipeFormProvider>
  );
}
