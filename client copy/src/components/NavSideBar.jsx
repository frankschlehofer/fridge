import {Link} from 'react-router-dom'

function NavSideBar() {
    return (
        <div className="w-1/5 flex flex-col p-8 pb-10 space-y-4 border-r border-r-neutral-800">
            <div className="text-4xl font-[Ruska] pt-8 pb-8 text-[#4E937A]">
                <Link to='/'>
                    <button className='hover:font-bold'>Fridge</button>
                </Link> 
            </div>
            <div className="text-2xl font-[merri] pb-5 text-[#333333]">
                <Link to='/profile'>
                    <button className='hover:font-bold'>Profile</button>
                </Link>
            </div>
            <div className="text-2xl font-[merri] pb-5 text-[#333333]">
                <Link to='/fridgepage'>
                    <button className='hover:font-bold'>My Fridge</button>
                </Link>
            </div>
            <div className="text-2xl font-[merri] pb-5 text-[#333333]">
                <Link to='/friends'>
                    <button className='hover:font-bold'>Friends</button>
                </Link>  
            </div>
            <div className="text-2xl font-[merri] pb-5 text-[#333333]">
                <Link to='/explore'>
                    <button className='hover:font-bold'>Explore Recipes</button>
                </Link>   
            </div>
            <div className="text-2xl font-[merri] pb-5 text-[#333333]">
                <Link to='/savedrecipes'>
                    <button className='hover:font-bold'>Saved Recipes</button>
                </Link>    
            </div>
        </div>
    );
}

export default NavSideBar;