import { IconArchive, IconBook2, IconShoppingBag, IconWorld } from '@tabler/icons-react';

export const routes = [
  {
    label: 'Discover',
    path: '/discover',
    icon: <IconWorld strokeWidth='1.5' size='2rem' />,
  },
  {
    label: 'Cookbook',
    path: '/cookbook',
    icon: <IconBook2 strokeWidth='1.5' size='2rem' />,
  },
  {
    label: 'Pantry',
    path: '/pantry',
    icon: <IconArchive strokeWidth='1.5' size='2rem' />,
  },
  {
    label: 'Shopping List',
    path: '/shopping-list',
    icon: <IconShoppingBag strokeWidth='1.5' size='2rem' />,
  },
];
