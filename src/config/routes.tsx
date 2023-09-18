import { AddFileIcon, BookIcon, DiscoverIcon, HomeIcon } from '@/components/icons';

export const routes = [
  {
    label: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    label: 'New Recipe',
    path: '/recipes/new',
    icon: <AddFileIcon />,
  },
  {
    label: 'Cookbook',
    path: '/cookbook',
    icon: <BookIcon />,
  },
  {
    label: 'Discover',
    path: '/recipes/discover',
    icon: <DiscoverIcon />,
  },
];
