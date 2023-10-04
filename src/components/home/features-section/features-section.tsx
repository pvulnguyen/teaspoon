import { IconCube, IconHeartHandshake, IconTemplate } from '@tabler/icons-react';
import styles from './features-section.module.css';

export function FeaturesSection() {
  return (
    <section className={styles.sectionContainer}>
      <h2>Streamline Your Cooking Experience with Teaspoon</h2>
      <p>
        Teaspoon is a digital cookbook that allows you to easily create, manage, and share your
        cooking recipes. With its user-friendly interface and community-driven content, Teaspoon is
        the ultimate tool for all your culinary adventures.
      </p>
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li className={styles.feature} key={index}>
            <div>{feature.icon}</div>
            <h3>{feature.header}</h3>
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const features = [
  {
    header: 'Create, Manage, and Share Your Recipes',
    description: 'Effortlessly create, organize, and share your favorite recipes.',
    icon: <IconCube size={48} />,
  },
  {
    header: 'User-Friendly Interface for Easy Navigation',
    description: 'Enjoy a seamless cooking experience with our intuitive interface.',
    icon: <IconTemplate size={48} />,
  },
  {
    header: 'Discover and Contribute to a Community of Food Lovers',
    description: 'Connect with fellow food enthusiasts and share your culinary creations.',
    icon: <IconHeartHandshake size={48} />,
  },
];
