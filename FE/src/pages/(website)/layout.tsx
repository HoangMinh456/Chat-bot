import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const LayoutWebsite = (props: Props) => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default LayoutWebsite