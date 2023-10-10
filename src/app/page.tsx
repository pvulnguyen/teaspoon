import { Fragment } from 'react';

import { SignedIn, SignedOut } from '@clerk/nextjs';

import { Cookbook, Landing } from '@views';

export default async function Page() {
  return (
    <Fragment>
      <SignedOut>
        <Landing />
      </SignedOut>
      <SignedIn>
        <Cookbook />
      </SignedIn>
    </Fragment>
  );
}
