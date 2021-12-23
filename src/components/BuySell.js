


const BuySell = (props) => {

    return(
        <div className='flex justify-center gap-8 px-20 mt-5'>
            <button onClick={props.sellFunction} className= 'ring-1 ring-blue-500 hover:bg-blue-500 rounded-md py-2 px-6' >Sell</button>
            <button onClick={props.buyFunction} className= 'hover:bg-blue-700 bg-blue-500 text-white rounded-md flex py-2 px-6' >Buy</button>
        </div>
    )

}

export default BuySell