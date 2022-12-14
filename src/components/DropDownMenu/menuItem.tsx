import { FC, MouseEventHandler } from 'react'
import styles from './dropDownMenu.module.scss'

interface IMenuItemProps{
  option: TCategory
  pick: Function
}

export const MenuItem: FC<IMenuItemProps> = function({ option, pick }){

  const pickHandler: MouseEventHandler = function(e){
    e.preventDefault()
    pick(option);
  }

  return <>
      <div className={styles.option} onClick={pickHandler}>
        <span>{ option.label }</span>
      </div>
  </>
}