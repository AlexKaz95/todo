import styles from './todoPanel.module.scss';

export const TodoPanelPlug = function(){
  return <>
    <div className={styles.todoPanel_container}>
      <div className={styles.empty}>Список пуст, добавь что-нибудь.</div>
    </div>
  </>
}