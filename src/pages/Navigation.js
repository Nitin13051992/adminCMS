/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";

function Navigation() {
    let auth = sessionStorage.getItem('user');
    const [sgnpop, setSgnpop] = useState(false)
    const targetRef = useRef();
    useEffect(() => {
        const TpHdr = targetRef.current.offsetHeight
        const item = document.getElementsByClassName("pg_cnct_wppr")[0]
        item.style.height = `calc(${100}vh - ${TpHdr}px)`
    }, []);
    const lgoutFun = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    }
    return (
        <div className='top_hd_wppr d-flex align-items-cnter justify-content-end' ref={targetRef}>
            <div className='container'>
                <div className='row d-flex align-items-cnter justify-content-end'>
                    <div className='usr_prfl_wppr w-auto d-flex align-items-cnter justify-content-start'>
                        <div className='prfl_usr' onClick={() => setSgnpop(!sgnpop)}>
                            <div className='prfl_icn'>
                                <img src='asset/images/dashboard/profile_icn.jpg' alt='' />
                            </div>
                            <div className='title'>
                                <h5>{JSON.parse(auth).name}</h5>
                                <small>Admin</small>
                            </div>
                            {
                                sgnpop && <div className={`lgot_menu`}>
                                    <ul>
                                        <li className="lgot_btn">
                                            <Link to="/">
                                                <em>
                                                    <img src="asset/icon/user-red.svg" alt="" />
                                                </em>
                                                <p>Profile</p>
                                            </Link>
                                        </li>
                                        <li className="lgot_btn">
                                            <Link to="/chnage-password">
                                                <em>
                                                    <img src="asset/icon/Passcode_Icon.svg" alt="" />
                                                </em>
                                                <p>Chnage Password</p>
                                            </Link>
                                        </li>
                                        <li className="lgot_btn">
                                            <Link to="/" onClick={lgoutFun}>
                                                <em>
                                                    <img src="asset/images/logout.svg" alt="" />
                                                </em>
                                                <p>Logout</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation
