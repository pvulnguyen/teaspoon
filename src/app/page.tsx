import { Fragment } from 'react';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Cookbook, CtaSection, FeaturesSection, HeroSection } from '@components/index';

import styles from '@styles/home.module.css';
import layout from '@styles/layout.module.css';

export default async function Page() {
  return (
    <Fragment>
      <SignedOut>
        <main className={styles.mainContainer}>
          <HeroSection />
          <FeaturesSection />
          <CtaSection />
        </main>
      </SignedOut>
      <SignedIn>
        <main className={layout.default}>
          <h1>My Cookbook</h1>
          <Cookbook />
        </main>
      </SignedIn>
    </Fragment>
  );
}
