import { Outlet } from 'react-router-dom'
import SideBar from './home/_components/SideBar'

const LayoutWebsite = () => {
    return (
        <>
            <div className='grid grid-cols-1 overflow-hidden transition-all duration-200 max-md:relative md:grid-cols-[minmax(auto,252px)_auto] xl:grid-cols-[minmax(auto,352px)_auto]'>
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}

export default LayoutWebsite