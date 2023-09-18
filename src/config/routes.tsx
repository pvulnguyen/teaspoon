import { BookIcon, DiscoverIcon, HomeIcon } from '@/components/icons';

export const routes = [
  {
    id: 0,
    label: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    id: 1,
    label: 'Cookbook',
    path: '/cookbook',
    icon: <BookIcon />,
  },
  {
    id: 2,
    label: 'Discover',
    path: '/recipes/discover',
    icon: <DiscoverIcon />,
  },
];
