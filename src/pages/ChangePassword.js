import React, { useState } from 'react';
import Layout from '../components/Layout';

function ChangePassword({ data }) {
    const [error, setError] = useState({});
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        // new_password: '',
        confirm_password: ''
    });

    const handleInptData = (event) => {
        setPasswordData({ ...passwordData, [event.target.name]: event.target.value });
    };

    const chngPswdFun = async () => {
        setError({});

        if (passwordData.new_password === "" || passwordData.confirm_password === "") {
            setError({ new_password: "Please enter a value" });
        }
        else if(passwordData.new_password !== passwordData.confirm_password ){
            setError({ new_password: "new password is not match",  confirm_password: "new password is not match" });
        } else {
            try {
                const response = await data.getAllAPIPage("change-password", 'GET', passwordData);
                if (response.errors) {
                    setError(response.errors);
                } else {
                    // Clear form fields after successful submission
                    setPasswordData({
                        old_password: '',
                        new_password: '',
                        confirm_password: ''
                    });
                }
            } catch (error) {
                console.error("Error changing password:", error);
            }
        }
    };

    return (
        <Layout> 
            <div className='pblsh_lst_wppr'>
                <div className="title d-flex align-items-start justify-content-between">
                    <h1>Change Password</h1>
                </div>
                <div className="mngrTem_wppr">            
                <div className="chngPswrd_wppr">
                    <div className="chng_wppr">
                        <div className="title">
                            <h2>Create New Password</h2>
                            <p>Your new password must be different from previously used passwords.</p>
                        </div>
                        <div className="chng_frm_wppr">
                            <fieldset>
                                <input 
                                    type="password" 
                                    name='old_password'
                                    className="txt_fld" 
                                    placeholder="Old password" 
                                    value={passwordData.old_password}
                                    onChange={handleInptData}
                                />
                                {error.old_password && <p className="error">{error.old_password}</p>}
                                <span className="shw_pswd_icn">
                                    <img src="asset/icon/eyes_icn.svg" alt=""/>
                                </span>
                            </fieldset>
                            <fieldset>
                                <input 
                                    type="password" 
                                    name='new_password'
                                    className="txt_fld" 
                                    placeholder="New password" 
                                    value={passwordData.new_password}
                                    onChange={handleInptData}                                 
                                    />
                                {error.new_password && <p className="error">{error.new_password}</p>}
                                <span className="shw_pswd_icn">
                                    <img src="asset/icon/eyes_icn.svg" alt="" />
                                </span>
                            </fieldset>
                            <fieldset>
                                <input 
                                    type="password" 
                                    name='confirm_password'
                                    className="txt_fld" 
                                    placeholder="Confirm password" 
                                    value={passwordData.confirm_password}
                                    onChange={handleInptData}
                                    />
                                {error.confirm_password && <p className="error">{error.confirm_password}</p>}
                                <span className="shw_pswd_icn">
                                    <img src="asset/icon/eyes_icn.svg" alt="" />
                                </span>
                            </fieldset>                        
                        </div>
                        <div className="chnl_title_lst">
                            <ul>
                                <li>
                                    <em></em>
                                    One lowercase character 
                                </li>
                                <li>
                                    <em></em>
                                    One Upercase character 
                                </li>
                                <li>
                                    <em></em>
                                    One Special character 
                                </li>
                                <li className="mgr_txt">
                                    <em></em>
                                    6 character minimum
                                </li>
                                <li className="mgr_txt">
                                    <em></em>
                                    1 Number
                                </li>
                            </ul>
                        </div>  
                        <div className="chng_frm_btn">
                            <button type="button" className="frm_btn" onClick={chngPswdFun}>Change Password</button>
                        </div>                  
                    </div>
                </div>
            </div>
            </div>        
        </Layout>
    )
}

export default ChangePassword;
