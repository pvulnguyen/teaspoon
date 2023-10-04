import Link from 'next/link';
import { Button } from '@mantine/core';

import utils from '@styles/utils.module.css';
import styles from './hero-section.module.css';

export function HeroSection() {
  return (
    <section className={styles.heroContainer}>
      <h2>Ad-Free Recipes On Demand</h2>
      <p>
        Discover a wide range of mouthwatering recipes and create your own culinary masterpieces
        with Teaspoon, the all-in-one digital cookbook.
      </p>
      <div className={utils.group}>
        <Button component={Link} href='/sign-up'>Get Started</Button>
        <Button variant='outline' component={Link} href='/discover'>Discover</Button>
      </div>
    </section>
  );
}
