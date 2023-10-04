import Link from 'next/link';
import { Button } from '@mantine/core';

import utils from '@styles/utils.module.css';
import styles from './cta-section.module.css';

export function CtaSection() {
  return (
    <section className={styles.sectionContainer}>
      <h2>Ready to get started?</h2>
      <p>
        Join Teaspoon today and unlock a world of culinary inspiration. Explore our vast collection
        of recipes, create your own, and share them with your friends and family.
      </p>
      <div className={utils.group}>
        <Button component={Link} href='/sign-up'>
          Sign Up
        </Button>
        <Button component={Link} href='/recipes' variant='outline'>
          Discover
        </Button>
      </div>
    </section>
  );
}
