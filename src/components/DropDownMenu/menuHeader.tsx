import { FC, MouseEventHandler } from 'react'
import styles from './dropDownMenu.module.scss'

interface IMenuHeader{
  menuOpened: boolean
  setMenuOpened: Function
  header: TCategory
}

export const MenuHeader: FC<IMenuHeader> = function({ menuOpened, setMenuOpened, header }){
  const menuToggleHandler: MouseEventHandler =  function(e){
    e.preventDefault();
    setMenuOpened(!menuOpened);
  }

  return <div
    className={`${styles.header} ${menuOpened ? styles.bottom_radius_none: ''}`} 
    onClick={ menuToggleHandler }
  >
  <span className={styles.label}>{ header?.label ?? 'Категория' }</span>
  { 
    menuOpened
    ? <span className={`material-symbols-outlined ${styles.menuToggle}`}>arrow_drop_up</span>
    : <span className={`material-symbols-outlined ${styles.menuToggle}`}>arrow_drop_down</span> 
  }
</div>
}