import { CategoryItemTab } from '../CategoryItemTab/categoryItemTab'
import styles from './categoryTabs.module.scss'

const categories = [
  {
    label: 'without',
    color: '#333',
    active: true
  },
  {
    label: 'home',
    color: '#00a00e',
    active: false
  },
  {
    label: 'home',
    color: '#00a00e',
    active: false
  },
]

export const CategoryTabs = function(){
  return <div className={styles.container}>{
    categories.map(cat => <CategoryItemTab cat={cat}/>)
  }
  <div className={styles.addBtn}> + </div>
  </div>
}