import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './_components/SideBar'

type Props = {}

const Home = (props: Props) => {
    return (
        <>
            <div className='flex gap-3'>
                <div>
                    <SideBar />
                </div>
                <div>
                    <h1 className='text-red-500 underline text-3xl font-bold'>
                        Hello
                    </h1>
                </div>
            </div>

        </>
    )
}

export default Home