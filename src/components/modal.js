

const Modal = (props) =>{

    return(

        <div className={(props.active ? 'absolute' : 'hidden') + ' opacity-80 bg-black h-screen w-screen z-50'}>
            {props.children}
        </div>
    )
}

export default Modal