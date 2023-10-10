import { SignUp } from '@clerk/nextjs';

import utils from '@styles/utils.module.css';

export const metadata = {
  title: 'Sign Up',
};

export default function Page() {
  return (
    <main className={utils.mainContainer}>
      <SignUp />
    </main>
  );
}
