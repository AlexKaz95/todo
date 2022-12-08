import { ChangeEvent, ChangeEventHandler, FC, KeyboardEventHandler, useState } from 'react'
import styles from './dropDownMenu.module.scss'

interface IMenuInputProps{
  setInputOpened: Function
  createCategory: Function
}

export const MenuInput: FC<IMenuInputProps> = function({ setInputOpened, createCategory }){
  const DEFAULT_CATEGORY: TCategory = {
    label: '',
    id: '',
    color: ''
  }
  
  const [newCategory, setNewCategory] = useState(DEFAULT_CATEGORY)

  const createCategoryHandler: KeyboardEventHandler = function( e ){
    if (e.key === 'Enter'){
      console.log(newCategory)
      createCategory(newCategory)
      setInputOpened(false);
      setNewCategory(DEFAULT_CATEGORY);
    }
  }

  const changeCategoryHandler: ChangeEventHandler = function( e: ChangeEvent<HTMLInputElement> ){
    //ограничение на 150 символов
    setNewCategory({
      ...newCategory,
      label: e.target.value
    })
  }

  const onBlurHandler = function(){
    //если пустая, закрываем, если нет, оставляем введеное значение
    if (newCategory.label) {
      return;
    }
    setInputOpened(false);
    setNewCategory(DEFAULT_CATEGORY);
  }

  const clearInput = function(){
    setInputOpened(false);
    setNewCategory(DEFAULT_CATEGORY);
  }

  return <div className={styles.input_container}> <input 
    autoFocus 
    className={`${styles.options_input}`} 
    tabIndex={ 0 } 
    type="text" 
    value={newCategory.label} 
    name="title" 
    id="title" 
    onChange={ changeCategoryHandler }
    autoComplete='off'
    placeholder="Новая категория..."
    onKeyDown = { createCategoryHandler }
    onBlur={ onBlurHandler }
  />

  <span className={`material-symbols-outlined ${styles.close_input}`} onClick={ clearInput }>close</span>
</div>
}