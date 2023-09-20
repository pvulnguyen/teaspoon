import { AddFileIcon, BookIcon, DiscoverIcon, HomeIcon } from '@/components/icons';

export const routes = [
  {
    label: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    label: 'Discover',
    path: '/recipes',
    icon: <DiscoverIcon />,
  },
  {
    label: 'Cookbook',
    path: '/cookbook',
    icon: <BookIcon />,
  },
  {
    label: 'New Recipe',
    path: '/recipes/new',
    icon: <AddFileIcon />,
  },
];
