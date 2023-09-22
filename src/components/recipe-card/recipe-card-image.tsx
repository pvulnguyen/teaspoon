import Image from 'next/image';
import styles from './recipe-card.module.css';

export function RecipeCardImage({ alt, src }: { alt: string; src: string }) {
  return (
    <div className={styles.image}>
      <Image src={src} alt={alt} fill priority />
    </div>
  );
}
