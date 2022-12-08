import { ChangeEvent, ChangeEventHandler, FC, KeyboardEventHandler, MouseEventHandler, useRef, useState } from 'react'
import styles from './dropDownMenu.module.scss'
import { MenuHeader } from './menuHeader'
import { MenuInput } from './menuInput'
import { MenuItem } from './menuItem'
import { MenuOptions } from './menuOptions'

interface IDropDownMenuProps{
  options: TCategory[],
  headerDef: TCategory
  setCategory: Function
  createCategory: Function
  tabIndex: number
}

export const DropDownMenu: FC<IDropDownMenuProps> = function( { options, headerDef, setCategory, tabIndex, createCategory } ){
  const [header, setHeader] = useState( headerDef )
  const [menuOpened, setMenuOpened] = useState(false)
  const [inputOpened, setInputOpened] = useState(false)

  const pickOption = function( option: TCategory ){
    setHeader( option );
    setCategory( option );
    setMenuOpened( false );
  }

  const openInput: MouseEventHandler = function(e){
    e.preventDefault();
    setMenuOpened( false );
    setInputOpened( true );
  }

  return <div className={styles.container} tabIndex={tabIndex}>
    { inputOpened && <MenuInput setInputOpened={setInputOpened} createCategory={createCategory}/> }
    { !inputOpened && <MenuHeader header={header} menuOpened={menuOpened} setMenuOpened={setMenuOpened}/> }
    { menuOpened && <MenuOptions options={options} openInput={openInput} pickOption={pickOption}/> }
  </div>
}