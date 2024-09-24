/* eslint-disable no-unused-vars */
import React, { useState  } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = (props) => {
    const [menu, setMenu] = useState(props.menudata.NavLst);
    const MenuSldBtn = (event) =>{
        const addCls = event.target
        addCls.closest('header').classList.toggle('smalr_wdth');
        document.getElementsByTagName("main")[0].classList.toggle('full_wdth')
    }
    return (
        <header >
            <div className="top-hdr-wppr ">
                <button type="button" className="cls_menu_btn" onClick={MenuSldBtn} ></button>
                <div className="row flex-wrap h-auto">
                    <div className="menu_lg_wppr">
                        <Link to="/">
                            <img src="asset/images/logo_icn.svg" alt="" />
                            <h2>CMS</h2>
                        </Link>
                    </div>
                    <nav>
                        <div className="menu_lst">
                            <ul>
                                {
                                    menu.map((data
                                    ) =>
                                        <li key={data.id}>
                                            <NavLink to={data.menuUrlLnk.replace(/ /g, '')} title={data.menuName} className={({ isActive }) => isActive ? "actv_menu" : ""}>
                                                <em>
                                                    <img src={data.menuIcn} alt="" />
                                                </em>
                                                <p>{data.menuName.replace(/-/g, '')}</p>
                                            </NavLink>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header