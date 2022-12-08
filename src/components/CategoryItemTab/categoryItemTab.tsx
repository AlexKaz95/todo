import { FC, MouseEventHandler } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './categoryItemTab.module.scss';


interface ICategoryItemTabProps{
  category: TCategory
}

export const CategoryItemTab: FC<ICategoryItemTabProps> = function({ category }){
  let [searchParams, setSearchParams] = useSearchParams();

  const onClickHandler: MouseEventHandler = function( e ){
    e.preventDefault();
    setSearchParams({ catId: category.id });
  }

  return <div className={styles.container} style={{background: category.id === searchParams.get( 'catId' ) ? category.color: '#ccc', color: 'white'}} onClick={onClickHandler}>
    { category.label }
  </div>
}