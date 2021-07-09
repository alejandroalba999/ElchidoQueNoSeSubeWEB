import React, { useState } from 'react'
import { AppRouter } from './router/AppRouter'
import { UserContext } from './components/authentication/UserContext'


export const WebApp = () => {

    const [user, setUser] = useState({})

    return (

        <UserContext.Provider value={{ user, setUser }}  >
            <AppRouter />
        </UserContext.Provider >

    )
}
