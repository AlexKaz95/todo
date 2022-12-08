import { FC, MouseEventHandler } from "react"
import { Button } from "../Button/button";
import styles from './modalWindow.module.scss';

interface IModalWindowProps {
    deletingTodo: ITodoItem | null,
    closeWindow: MouseEventHandler,
    confirm: MouseEventHandler,
    cancel: MouseEventHandler
}

export const ModalWindow: FC<IModalWindowProps> = function({ closeWindow, confirm, cancel, deletingTodo }){
    return <div className={styles.container} onClick={ closeWindow }>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={`material-symbols-outlined ${styles.closeButton}`} onClick={closeWindow}>close</span>
        
        <div className={styles.textField}>
            Забить на задачу "{deletingTodo?.title}"?
        </div>

        <div className={styles.actionField}>
            <Button text='Забить' callback={confirm} type='main' color="red"/>
            <Button text='Не, оставлю' callback={cancel} type='main'/>
        </div>
        </div>
    </div>
}