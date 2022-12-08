import { FC, useState } from 'react'
import { CategoryItemTab } from '../CategoryItemTab/categoryItemTab'
import styles from './categoryTabs.module.scss'

interface ICategoryTabsProps {
  categories: TCategory[]
}

export const CategoryTabs: FC<ICategoryTabsProps> = function( { categories } ){
  return <div className={styles.container}>{
    categories.map(category => <CategoryItemTab category={category}/>)
  }
  </div>
}