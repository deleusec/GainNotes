import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";

function Header(props) {
    const [showMenu, setShowMenu] = useState(false)
    const nav = () => {
        return (
            <nav>
                <ul>
                    <li className={'inline-block'}><Link href={'/'}><a className={'flex items-center mr-6'}><Image src={'/home.svg'} width={'20'} height={'20'}/><span className={'ml-2 text-indigo-400 hover:text-purple-400 duration-200'}>Home</span></a></Link></li>
                    <li className={'inline-block'}><Link href={'/calendar'}><a className={'flex items-center mr-6'}><Image src={'/calendar.svg'} width={'20'} height={'20'}/><span className={'ml-2 text-indigo-400 hover:text-purple-400 duration-200'}>Calendar</span></a></Link></li>
                    <li className={'inline-block'}><Link href={'/settings'}><a className={'flex items-center'}><Image src={'/settings.svg'} width={'20'} height={'20'}/><span className={'ml-2 text-indigo-400 hover:text-purple-400 duration-200'}>Settings</span></a></Link></li>
                </ul>
            </nav>
        )
    }

    return (
        <header className={'flex items-center p-3 border-b border-b-stone-100 justify-between bg-white font-unineuebook'}>
            <Link href={'/'}><a><Image src={'/logo.svg'} width={'125'} height={'40'}/></a></Link>
            <div className={'hidden lg:block'}>
                {nav()}
            </div>

            <div onClick={()=>setShowMenu(true)} className={'flex lg:hidden mr-3 hover:rotate-45 duration-300 cursor-pointer p-2 items-center'}>
                    <Image src={"/menu.svg"} width={20} height={20}/>
            </div>
            <div className={'fixed z-50 w-full top-0 left-0 right-0 bottom-0 flex justify-center bg-stone-100 items-center '+ (showMenu ? "block":"hidden")}>
                <div onClick={()=>setShowMenu(false)}  className={'cursor-pointer absolute top-0 right-0 mx-5 my-3 p-3'}>
                    <Image  src={"/cross.svg"} width={20} height={20}/>
                </div>
                {nav()}
            </div>
        </header>
    );
}

export default Header;
