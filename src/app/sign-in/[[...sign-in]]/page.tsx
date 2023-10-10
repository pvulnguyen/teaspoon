import { SignIn } from '@clerk/nextjs';

import utils from '@styles/utils.module.css';

export const metadata = {
  title: 'Sign In',
};

export default function Page() {
  return (
    <main className={utils.mainContainer}>
      <SignIn />
    </main>
  );
}
