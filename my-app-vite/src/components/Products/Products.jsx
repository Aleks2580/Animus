import React from 'react'
import OneProduct from './OneProduct'
import styles from './Products.module.css'
import { useProducts } from '../../constants/ProductsConstants'

export default function Products() {
  const products = useProducts()
  return (
     <div className={styles.products}>
    {products?.map((product, index) => (
      <OneProduct key={index} {...product} />
    ))}
    </div> 
  )
}
