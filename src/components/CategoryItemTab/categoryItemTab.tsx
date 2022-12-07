import { FC } from 'react';
import {  } from 'react-router-dom';
import styles from './categoryItemTab.module.scss';


type TCategory = {
  label: string
  color: string
  active: boolean
}

interface ICategoryItemTabProps{
  cat: TCategory
}

export const CategoryItemTab: FC<ICategoryItemTabProps> = function({ cat }){
  return <div className={styles.container} style={{background: cat.active ? cat.color: '#ccc', color: 'white'}}>
    {cat.label}
  </div>
}