import React from 'react';
import styled from "styled-components";
import "../modal.css"; 

const Modal = (props) => {
    const { open, close, header } = props;

    return (
        <div className={ open? 'openModal modal':'modal'} >
            {open? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times;</button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <Button className="close" onClick={close}> close </Button>
                    </footer>
                </section>
            ): null}

        </div>
    )
}
const Button = styled.button`
    z-index : 1px;
`



export default Modal;
