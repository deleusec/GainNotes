import React from 'react';
import Link from "next/link";
import Image from "next/image";

function Header(props) {
    return (
        <header className={'flex items-center p-3 border-b border-b-stone-100 justify-between bg-white'}>
            <Link href={'/'}><a><Image src={'/logo.svg'} width={'125'} height={'40'}/></a></Link>
            <nav>
                <ul>
                    <li className={'inline-block'}><Link href={'/'}><a className={'flex items-center mr-6'}><Image src={'/home.svg'} width={'20'} height={'20'}/><span className={'ml-2 text-indigo-400 hover:text-purple-400 duration-200'}>Home</span></a></Link></li>
                    <li className={'inline-block'}><Link href={'/calendar'}><a className={'flex items-center mr-6'}><Image src={'/calendar.svg'} width={'20'} height={'20'}/><span className={'ml-2 text-indigo-400 hover:text-purple-400 duration-200'}>Calendar</span></a></Link></li>
                    <li className={'inline-block'}><Link href={'/settings'}><a className={'flex items-center'}><Image src={'/settings.svg'} width={'20'} height={'20'}/><span className={'ml-2 text-indigo-400 hover:text-purple-400 duration-200'}>Settings</span></a></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
