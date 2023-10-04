import { IconBook2, IconFilePlus, IconHome, IconWorld } from '@tabler/icons-react';

export const routes = [
  {
    label: 'Home',
    path: '/',
    icon: <IconHome />,
  },
  {
    label: 'Discover',
    path: '/discover',
    icon: <IconWorld />,
  },
  {
    label: 'Cookbook',
    path: '/cookbook',
    icon: <IconBook2 />,
  },
  {
    label: 'Add Recipe',
    path: '/recipes/new',
    icon: <IconFilePlus />,
  },
];
