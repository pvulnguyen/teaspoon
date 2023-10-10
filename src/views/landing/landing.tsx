import { Fragment } from 'react';

import { Button } from '@mantine/core';
import { IconCube, IconHeartHandshake, IconTemplate } from '@tabler/icons-react';
import Link from 'next/link';

import { LandingSection } from './landing-section';

import utils from '@styles/utils.module.css';
import styles from './landing.module.css';

export function Landing() {
  return (
    <Fragment>
      <LandingSection title='Ad-Free Recipes On Demand' hero>
        <p>Discover a wide range of mouthwatering recipes and create your own culinary masterpieces with Teaspoon, the all-in-one digital cookbook.</p>
        <div className={utils.group}>
          <Button component={Link} href='/sign-up'>Get Started</Button>
          <Button variant='outline' component={Link} href='/discover'>Discover</Button>
        </div>
      </LandingSection>
      <LandingSection title='Streamline Your Cooking Experience'>
        <p>Teaspoon is a digital cookbook that allows you to easily create, manage, and share your cooking recipes. With its user-friendly interface and community-driven content, Teaspoon is the ultimate tool for all your culinary adventures.</p>
        <ul className={styles.features}>
          {features.map((feature, index) => (
            <li key={index}>
              <div>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>
      </LandingSection>
      <LandingSection title='Ready to get started?'>
        <p>Join Teaspoon today and unlock a world of culinary inspiration. Explore our vast collection of recipes, create your own, and share them with your friends and family.</p>
        <div className={utils.group}>
          <Button component={Link} href='/sign-up'>Sign Up</Button>
          <Button component={Link} href='/recipes' variant='outline'>Discover</Button>
        </div>
      </LandingSection>
    </Fragment>
  );
}

const features = [
  {
    title: 'Create, Manage, and Share Your Recipes',
    description: 'Effortlessly create, organize, and share your favorite recipes.',
    icon: <IconCube size={48} />,
  },
  {
    title: 'User-Friendly Interface for Easy Navigation',
    description: 'Enjoy a seamless cooking experience with our intuitive interface.',
    icon: <IconTemplate size={48} />,
  },
  {
    title: 'Discover and Contribute to a Community of Food Lovers',
    description: 'Connect with fellow food enthusiasts and share your culinary creations.',
    icon: <IconHeartHandshake size={48} />,
  },
];
