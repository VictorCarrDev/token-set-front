


const BuySell = (props) => {

    return(
        <div className='flex justify-center gap-8 px-20 mt-5'>
            <button onClick={props.buyFunction} className= 'ring-1 ring-gray-500 hover:bg-gray-500 rounded-md py-2 px-6' >Sell</button>
            <button onClick={props.buyFunction} className= 'hover:bg-gray-700 bg-gray-500 text-white rounded-md flex py-2 px-6' >Buy</button>
        </div>
    )

}

export default BuySell