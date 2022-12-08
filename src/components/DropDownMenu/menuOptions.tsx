import { FC, MouseEventHandler } from 'react'
import styles from './dropDownMenu.module.scss'
import { MenuItem } from './menuItem'

interface IMenuOptionsProps {
  options: TCategory[]
  pickOption: Function
  openInput: MouseEventHandler
}

export const MenuOptions:  FC<IMenuOptionsProps> = function({ options, pickOption, openInput}){
  return <div className={styles.options}> 
  { options.map(op => <MenuItem option={op} pick={pickOption}/>)} 
  <div className={styles.option_add} onClick={openInput}>Создать...</div> 
</div>
}