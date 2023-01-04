import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import Button from './Button';

const BackDrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <h1 className={styles.header}>{props.message}</h1>
                <div className={styles.btnContainer}>
                    {props.additionalBtn && (
                        <Button className={styles.btn} onClick={props.additionalBtnFnc}>
                            {props.additionalBtnName}
                        </Button>
                    )}
                    <Button className={styles.btn} onClick={props.btnFnc}>
                        {props.button}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');
const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay
                    message={props.message}
                    button={props.button}
                    btnFnc={props.onClose}
                    additionalBtn={props.additionalBtn}
                    additionalBtnFnc={props.additionalBtnFnc}
                    additionalBtnName={props.additionalBtnName}
                />,
                portalElement
            )}
        </>
    );
};

export default Modal;
