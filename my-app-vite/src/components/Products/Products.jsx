import React from 'react'
import styles from './Products.module.css'

export default function Products() {
  return (
     <div className={styles.products}>
            <div className={styles.product}>
              <img src="f.jpg" alt="Fenotropil" />
              <h2>Fenotropil</h2>
              <p>A cognitive enhancer for focus and energy.</p>
            </div>
            <div className={styles.product}>
              <img src="s.jpg" alt="Semax" />
              <h2>Semax</h2>
              <p>Neuropeptide for memory and brain health.</p>
            </div>
            <div className={styles.product}>
              <img src="i.jpg" alt="IRS-19" />
              <h2>IRS-19</h2>
              <p>Immune system support for a healthier you.</p>
            </div>
            <div className={styles.product}>
              <img src="n.jpg" alt="Noopept" />
              <h2>Noopept</h2>
              <p>Boost cognition and protect your brain.</p>
            </div>
            <div className={styles.product}>
              <img src="a.jpg" alt="Alpha GPC" />
              <h2>Alpha GPC</h2>
              <p>Enhance memory and support brain health.</p>
            </div>
          </div> 
  )
}
