import { FC, MouseEventHandler, useState } from 'react'
import styles from './dropDownMenu.module.scss'
import { MenuItem } from './menuItem'

interface IDropDownMenuProps{
  options: TOption[],
  headerDef: THeader
  setCategory: Function
  tabIndex: number
}

export const DropDownMenu: FC<IDropDownMenuProps> = function( { options, headerDef, setCategory, tabIndex } ){
  const [header, setHeader] = useState( headerDef )
  const [isOpen, setIsOpen] = useState(false)

  const menuToggle: MouseEventHandler = function(e){
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const pickOption = function( option: TOption ){
    setHeader( option );
    setCategory( option );
    setIsOpen( false );
  }


  return <>
    <div className={styles.container} tabIndex={tabIndex}>
      <div className={`${styles.header} ${isOpen ? styles.bottom_radius_none: ''}`} onClick={menuToggle}>
        <span>{ header?.label ?? 'Категория' }</span>
        { 
          isOpen
          ? <span className={`material-symbols-outlined ${styles.menuToggle}`}>arrow_drop_up</span>
          : <span className={`material-symbols-outlined ${styles.menuToggle}`}>arrow_drop_down</span> 
        }
      </div>
      {
        isOpen
        ? <div className={styles.options}> 
            { options.map(op => <MenuItem option={op} pick={pickOption}/>)} 
            <div className={styles.option_add}>+</div> 
          </div>
        : <></>
      }
    </div>
  </>
}