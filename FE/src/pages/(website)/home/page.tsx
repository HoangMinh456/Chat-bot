import { AppContext } from '@/components/contexts/AppContext';
import { useContext, useEffect } from 'react';
import SideBar from './_components/SideBar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    const { openMenu, setOpenMenu }: any = useContext(AppContext)
    const closeMenu = () => {
        if (openMenu === 'open') {
            setOpenMenu('close')
        }
    }

    useEffect(() => {
        const screen = document.querySelector('#Screen')
        if (openMenu === 'open') {
            screen?.classList.add('blur-sm')
            screen?.addEventListener('click', closeMenu)
            if (screen?.children) {
                Array.from(screen.children).forEach(child => {
                    child.classList.add('pointer-events-none');
                });
            }
        } else {
            screen?.classList.remove('blur-sm')
            screen?.removeEventListener('click', closeMenu)
            if (screen?.children) {
                Array.from(screen.children).forEach(child => {
                    child.classList.remove('pointer-events-none');
                });
            }
        }

        return () => {
            screen?.removeEventListener('click', closeMenu)
        };

    }, [openMenu])

    return (
        <>
            <div className='grid grid-cols-1 overflow-hidden transition-all duration-200 max-md:relative md:grid-cols-[minmax(auto,252px)_auto] xl:grid-cols-[minmax(auto,352px)_auto]'>
                <SideBar />
                <Outlet />
            </div>
        </>
    );
}

export default Home