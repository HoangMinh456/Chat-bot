import { useState } from 'react';
import SideBar from './_components/SideBar';
import ChatComponent from './_components/Chat';

type Props = {}

const Home = (props: Props) => {
    const [openMenu, setOpenMenu] = useState<string>('close')
    const handleOpenMenu = (item: string) => {
        setOpenMenu(item)
    }
    return (
        <>
            <div className='grid grid-cols-1 overflow-hidden transition-all duration-200 max-md:relative md:grid-cols-[minmax(auto,252px)_auto] xl:grid-cols-[minmax(auto,352px)_auto]'>

                <SideBar openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
                <ChatComponent openMenu={openMenu} setOpenMenu={setOpenMenu} handleOpenMenu={handleOpenMenu} />
                {/* <div className='Main-chat grid justify-center items-center'>
                    main
                </div> */}
            </div >

        </>
    )
}

export default Home