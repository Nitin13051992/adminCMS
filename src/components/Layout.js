import React from 'react';
import Navigation from "../pages/Navigation";
const Layout = ({ children }) => {
    return (
        <main>
            <Navigation />            
            <div className='pg_cnct_wppr'>
                <div className="cmn-txt-wppr">
                    <div className='dshbrd_wppr'>
                        <div className="container h-100">
                            <div className="row h-100">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Layout;