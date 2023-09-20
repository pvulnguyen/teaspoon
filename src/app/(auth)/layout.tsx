import utils from '@/lib/utils.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className={utils.center}>{children}</main>;
}
