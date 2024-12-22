// src/hooks/usePosts.js
import { useTranslation } from "react-i18next";
import {
  post1, post2, post3, post4, post5, post6, post7, post8, post9, post10
} from "../assets/index"; // Ensure you have these images in your assets

export const usePosts = () => {
  const { t } = useTranslation();

  const posts = [
    { id: 1, image: post1, title: t('posts.title1') },
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
