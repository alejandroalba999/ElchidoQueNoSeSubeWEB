import React, { useEffect, useState } from 'react'
import { RegistroPersona } from '../usuarios/RegistroPersona';
import caleo_logo from '../../assets/images/caleo_logo.png'
import { Navigation } from '../authentication/navigation.jsx';
import { useHistory } from 'react-router';

export const Register = () => {
    const history = useHistory();
    const [reload, setReload] = useState(false)

    // useEffect(() => {
    //     history.push('/auth/login')
    // }, [!reload])
    return (
        <div className="wrapper2 fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <Navigation />
                    <img src={caleo_logo} id="icon" alt="User Icon" />
                </div>
                <div className="m-3">
                    <RegistroPersona setReload={setReload} />
                </div>
            </div>

        </div>
    )
}
