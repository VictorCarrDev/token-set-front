

const Modal = (props) =>{

    return(

        <div className={(props.active ? 'absolute' : 'hidden') + ' bg-opacity-80 bg-black h-screen w-screen z-50 flex'}>
            {props.children}
        </div>
    )
}

export default Modal