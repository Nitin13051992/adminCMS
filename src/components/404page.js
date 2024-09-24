import React from 'react';
import { Link } from "react-router-dom";
// import ErrorImg from '../asset/images/404.jpg'
import ErrorImg from '../asset/images/404.svg'
import Layout from './Layout';
function Errorpage() {
  return (
    <Layout> 
        <div className='pblsh_lst_wppr'>
            <div className='eror_wppr d-flex flex-wrap'>
                <span className='eror_img'>
                    <img src={ErrorImg} alt='' />
                </span>
                <div className='bct_hm_btn'>
                    <Link to={"/"}> Back to Home </Link>
                </div>
            </div>       
        </div>        
    </Layout>
  )
}

export default Errorpage
