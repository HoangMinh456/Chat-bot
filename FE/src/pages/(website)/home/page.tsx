
import { Menu } from 'lucide-react';
import { useState } from 'react';
import SideBar from './_components/SideBar';
import ChatComponent from './_components/Chat';

type Props = {}

const Home = (props: Props) => {
    const [openMenu, setOpenMenu] = useState<string>('close')
    console.log(openMenu)
    const handleOpenMenu = (item: string) => {
        setOpenMenu(item)
    }
    return (
        <>
            <div className='grid grid-cols-1 transition-all duration-200 max-md:relative md:grid-cols-[minmax(auto,252px)_auto] lg:grid-cols-[minmax(auto,352px)_auto]'>
                <div className={`flex md:hidden p-4`}>
                    <div className='cursor-pointer' onClick={openMenu === 'open' ? () => handleOpenMenu('close') : () => handleOpenMenu('open')}>
                        <Menu size={32} />
                    </div>
                </div>
                <SideBar openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
                <ChatComponent/>
                {/* <div className='Main-chat grid justify-center items-center'>
                    main
                </div> */}
            </div >

        </>
    )
}

export default Home