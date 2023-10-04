import { Cookbook } from '@components/cookbook';
import layout from '@styles/layout.module.css';

export default function Page() {
  return (
    <main className={layout.default}>
      <h1>My Cookbook</h1>
      <Cookbook />
    </main>
  );
}
