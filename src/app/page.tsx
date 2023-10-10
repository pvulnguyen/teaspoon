import { Fragment } from 'react';

import { SignedIn, SignedOut } from '@clerk/nextjs';

import { Cookbook } from '@components/index';
import { Landing } from '@views';

import layout from '@styles/layout.module.css';

export default async function Page() {

  return (
    <Fragment>
      <SignedOut>
        <Landing />
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
