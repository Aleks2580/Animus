import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SubHero.module.css';
import { GiMeditation } from "react-icons/gi";
import { RiBrain2Fill } from "react-icons/ri";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";
import { RiFocus3Line } from "react-icons/ri";

export default function Products() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('subhero.title')}</h1>
        <p className={styles.subtitle}>
          {t('subhero.subtitle', { strong: (text) => <strong>{text}</strong> })}
        </p>
        <div className={styles.icons}>
          <div className={styles.iconItem}>
            <RiBrain2Fill className={styles.icon} />
            <span>{t('subhero.icons.memory')}</span>
          </div>
          <div className={styles.iconItem}>
            <RiFocus3Line className={styles.icon} />
            <span>{t('subhero.icons.focus')}</span>
          </div>
          <div className={styles.iconItem}>
            <GiMeditation className={styles.icon} />
            <span>{t('subhero.icons.calm')}</span>
          </div>
          <div className={styles.iconItem}>
            <MdOutlineEnergySavingsLeaf className={styles.icon} />
            <span>{t('subhero.icons.energy')}</span>
          </div>
          <div className={styles.iconItem}>
            <IoBodyOutline className={styles.icon} />
            <span>{t('subhero.icons.wellness')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
