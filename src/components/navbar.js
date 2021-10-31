
const navBar = (props) =>{

    return(

        <div className ="flex shadow-sm bg-gray-300 px-2 h-16">
            <div className ='flex-grow '/>
            <p className='m-auto px-2 '>Address 0x0000...345</p>
            <div className ='flex-grow '/>

            <p className='m-auto px-2'>Address 0x0000...345</p>
            <button className='hover:bg-blue-700 bg-blue-500 rounded-sm text-white px-6'type="button" >
                Connect
                </button>
        </div>
    )
}

export default navBar