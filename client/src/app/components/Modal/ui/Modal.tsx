import React, {forwardRef, useEffect} from 'react';
import cls from "./Modal.module.scss";

interface IModalProps {
    children: React.ReactElement,
    mode: boolean
}

const Modal = forwardRef<HTMLDivElement, IModalProps>(({ children, mode }, ref) => {

    useEffect(() => {
        if (mode) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [mode]);

    return (
        <div className={mode ? cls.main : cls.none}>
            <div className={cls.bg}></div>
            <div className={cls.modal}>
                <div className={cls.wrapper} ref={ref}>
                    {children}
                </div>
            </div>
        </div>
    );
});

export default Modal;
