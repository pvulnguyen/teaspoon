import { Fragment } from 'react';
import { Button } from '@mantine/core';

import utils from '@/lib/utils.module.css';
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.mainContainer}>
      <Hero />
      <Features />
      <CallToAction />
      <footer className={styles.footerContainer}>
        <p>&copy;{new Date().getFullYear()} Teaspoon. All rights reserved.</p>
      </footer>
    </main>
  );
}

function Hero() {
  return (
    <section className={`${utils.center} ${styles.heroContainer}`}>
      <h2 className={styles.heroTitle}>Ad-Free Recipes On Demand</h2>
      <p className={styles.container}>
        Discover a wide range of mouthwatering recipes and create your own culinary masterpieces
        with Teaspoon, the all-in-one digital cookbook.
      </p>
      <div className={utils.group}>
        <Button>Get Started</Button>
        <Button variant='outline'>Discover</Button>
      </div>
    </section>
  );
}

function Features() {
  return (
    <Fragment>
      <section className={`${utils.stack} ${styles.sectionContainer}`}>
        <h2 className={`${styles.container} ${styles.sectionTitle}`}>
          Streamline Your Cooking Experience with Teaspoon
        </h2>
        <p className={styles.container}>
          Teaspoon is a digital cookbook that allows you to easily create, manage, and share your
          cooking recipes. With its user-friendly interface and community-driven content, Teaspoon
          is the ultimate tool for all your culinary adventures.
        </p>
        <ul className={`${styles.featureList}`}>
          {features.map((feature, index) => (
            <div className={styles.featureContainer} key={index}>
              <h3 className={styles.featureTitle}>{feature.header}</h3>
              <p className={styles.containerSm}>{feature.description}</p>
            </div>
          ))}
        </ul>
      </section>
    </Fragment>
  );
}

function CallToAction() {
  return (
    <section className={utils.center}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.sectionTitle}>Ready to get started?</h2>
        <div className={`${utils.stack} ${styles.container}`}>
          <p>
            Join Teaspoon today and unlock a world of culinary inspiration. Explore our vast
            collection of recipes, create your own, and share them with your friends and family.
          </p>
          <div className={utils.group}>
            <Button>Sign Up</Button>
            <Button variant='outline'>Discover</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    header: 'Create, Manage, and Share Your Recipes',
    description: 'Effortlessly create, organize, and share your favorite recipes.',
    icon: '',
  },
  {
    header: 'User-Friendly Interface for Easy Navigation',
    description: 'Enjoy a seamless cooking experience with our intuitive interface.',
    icon: '',
  },
  {
    header: 'Discover and Contribute to a Community of Food Lovers',
    description: 'Connect with fellow food enthusiasts and share your culinary creations.',
    icon: '',
  },
];
