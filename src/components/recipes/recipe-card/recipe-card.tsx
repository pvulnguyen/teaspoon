'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button, Card, CardSection, Flex, Pill, Text } from '@mantine/core';

export type RecipeCardProps = {
  id: string;
  name: string;
  categories: { name: string }[];
  image: { url: string };
};

export function RecipeCard({ recipe }: { recipe: RecipeCardProps }) {
  return (
    <Card shadow='sm' padding='sm' radius='md' maw={{ base: '100%', md: '18rem' }} withBorder>
      <CardSection
        h={{ base: '28rem', md: '18rem' }}
        w={{ base: '20rem', md: '18rem' }}
        pos='relative'
      >
        <Image src={recipe.image.url} alt={recipe.name} objectFit='cover' fill />
      </CardSection>
      <Text fz={{ base: 'xl', md: 'lg' }} fw='500' my='md'>
        {recipe.name}
      </Text>
      <Flex wrap='wrap' gap='xs'>
        {recipe.categories.map((category) => (
          <Pill key={category.name}>{category.name}</Pill>
        ))}
      </Flex>
      <Button variant='light' mt='md' component={Link} href={`/recipes/${recipe.id}`}>View Recipe</Button>
    </Card>
  );
}
