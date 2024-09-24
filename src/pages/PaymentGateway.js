/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Layout from '../components/Layout';
function PaymentGateway({data}) { 
    const [pymtCrt, setPymetCrt] = useState(data.Payment);
    const [activeIndex, setActiveIndex] = useState(null);   
    const handleToggle = (indx) => {
          setActiveIndex(activeIndex === indx ? null : indx);
    };
    const [postData, setPostData] = useState({
        key: '',
        secret: ''
    });
    const handleInptData = (event) => {
        setPostData({ ...postData, [event.target.name]: event.target.value });
    };
    const handleNext = () => {
        console.log("from-Data", postData)        
    };
   return (
    <Layout>
        <div className='pblsh_lst_wppr'>
            <div className="title d-flex align-items-center flex-wrap">
                <h1 className='w-100 mb-2'>Payment Gateway</h1> 
                <p> Update your payment gateway here and start and receiving payment online. </p>              
            </div>            
            <div className='pymnt_crt_wppr'>
                {
                    pymtCrt.map((data, indx) => 
                        <div className={`pymt_crt ${activeIndex === indx ? 'actv_cls' : ''}`} key={indx}>
                            <div className='title'>
                                <div className='pymt_icn'>
                                    <img src={data.pymtlogo} alt='' />
                                </div>
                                <button type='button' className='slct_btn' onClick={() => handleToggle(indx)} ></button>
                            </div>
                            <div className='pymt_frm_wppr'>
                                <fieldset>
                                    <label>key ID</label>
                                    <input 
                                        type='text' 
                                        name='key' 
                                        value={postData.key}
                                        className='text_fld' 
                                        onChange={handleInptData}
                                    />
                                </fieldset>
                                <fieldset>
                                    <label>key Secret</label>
                                    <input 
                                        type='text' 
                                        name='secret' 
                                        value={postData.secret}
                                        className='text_fld' 
                                        onChange={handleInptData}
                                    />
                                </fieldset>
                                <button type='button' onClick={handleNext} className='sbmt_frm'> Submit </button>
                            </div>
                        </div>
                    )
                }
                
            </div>
        </div>
    </Layout>
  )
}

export default PaymentGateway
