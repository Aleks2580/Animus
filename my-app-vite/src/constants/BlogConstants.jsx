import { useTranslation } from "react-i18next";
import {
  post1, post2, post3, post4, post5, post6, post7, post8, post9, post10
} from "../assets/index"; // Ensure you have these images in your assets

export const usePosts = () => {
  const { t } = useTranslation();

  const posts = [
    {
      id: 1,
      image: post1,
      title: 'How Does a Dopamine Detox Help Reset Your Brain?',
      date: "January 7, 2025",
      intro: `
        In today's world, we are constantly surrounded by things that give us quick hits of dopamine—
        social media likes, fast food, and endless entertainment. With so many instant gratifications at our fingertips,
        it's easy to get caught in a cycle of overstimulation.
      `,
      content: `
        <h2>How Does Dopamine Detox Help Reset Your Brain?</h2>
        <p>
          In today's world, we are constantly surrounded by things that give us quick hits of dopamine—
          social media likes, fast food, and endless entertainment. With so many instant gratifications at our fingertips,
          it's easy to get caught in a cycle of overstimulation.
        </p>
        <h3>What is Dopamine?</h3>
        <p>
          Dopamine is often called the brain's "anticipation hormone" because it plays a key role in how we feel excitement
          and curiosity. It is produced in the brain and acts as a messenger that influences our mood, focus, and behavior.
        </p>
        <blockquote>
          "Dopamine helps us feel rewarded and motivated."
        </blockquote>
        <h3>How Can a Dopamine Detox Help You?</h3>
        <p>
          A dopamine detox allows you to become more aware of your habits and how they impact your life. It encourages mindfulness
          and helps reset your brain’s reward pathways.
        </p>
        <ul>
          <li>Reduce dependence on instant gratification.</li>
          <li>Improve focus and productivity.</li>
          <li>Recalibrate your brain’s reward system.</li>
        </ul>
        <h3>Conclusion</h3>
        <p>
          While a dopamine detox cannot eliminate dopamine, it can help reduce overstimulation and restore balance.
          By adopting healthier habits, you can regain control over your focus and improve your overall well-being.
        </p>
      `,
    },
    { id: 2, image: post2, title: t('posts.title2') },
    { id: 3, image: post3, title: t('posts.title3') },
    { id: 4, image: post4, title: t('posts.title4') },
    { id: 5, image: post5, title: t('posts.title5') },
    { id: 6, image: post6, title: t('posts.title6') },
    { id: 7, image: post7, title: t('posts.title7') },
    { id: 8, image: post8, title: t('posts.title8') },
    { id: 9, image: post9, title: t('posts.title7') },
    { id: 10, image: post10, title: t('posts.title8') },
  ];

  return posts;
};
