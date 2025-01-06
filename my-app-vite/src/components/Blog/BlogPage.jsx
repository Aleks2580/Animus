import React from 'react'
import styles from './BlogPage.module.css'
import { useParams } from "react-router-dom";
import { usePosts } from '../../constants/BlogConstants';

export default function BlogPage() {
  const { blogId } = useParams();
  const posts = usePosts();
  const post = posts.find((p) => p.id === blogId);
  return (
    <div>{blogId}</div>
  )
}
