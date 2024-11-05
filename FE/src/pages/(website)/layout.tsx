import { Outlet } from 'react-router-dom'
import SideBar from './home/_components/SideBar'

const LayoutWebsite = () => {
    return (
        <>
            <div className=''>
                <Outlet />
            </div>
        </>
    )
}

export default LayoutWebsite