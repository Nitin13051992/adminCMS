/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import Lognbgimg from "../asset/images/login/OTT_bg.jpg";
import Loader from "../components/LoaderPage";
import axios from "axios";

const Login = (props) => {
    const [loginOpup, setLoginOpup] = useState(true)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorEml, setErrorEml] = useState();
    const [errorPswd, setErrorPswd] = useState();
    const [errorFld, setErrorFld] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [lodrImg, setLodrImg] = useState(false)
    // const API = axios.create({
    //     baseURL: props.apidata
    // });
    const API = axios.create({
        baseURL: props.apidata // Ensure props.apidata is correct
    });

    const LgnFrm = (e) => {
        setLoginOpup(false)
    }
    const ClsFrm = (e) => {
        e.stopPropagation();
        setLoginOpup(true)
        setErrorEml("")
        setErrorPswd("")
        setErrorFld(false)
    }
    const stopPopbx = (e) => {
        e.stopPropagation();
        setLoginOpup(false)
        setErrorEml("")
        setErrorPswd("")
        setErrorFld(false)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLodrImg(true);
        try {
            const res = await API.post("/login", { email, password });
            if (res.status === 200) {
                const { access_token, user } = res.data;
                sessionStorage.setItem('access_token', JSON.stringify(access_token));
                sessionStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem("access_token", JSON.stringify(access_token));
                window.location.href = '/dashboard';
                setLodrImg(false);
            } else {
                console.log('Login failed');
                setLodrImg(false);
            }
        } catch (err) {
            console.error("Error details:", err);
            if (err.response) {
                console.error("Response status:", err.response.status);
                console.error("Response data:", err.response.data);
            } else if (err.request) {
                console.error("Request was made but no response was received", err.request);
            } else {
                console.error("Error setting up the request", err.message);
            }
            setErrorEml("Unable to connect. Please check your internet connection or try again later.");
            setErrorPswd("");
            setErrorFld(true);
            setLodrImg(false);
        }
    
        if (rememberMe) {
            localStorage.setItem("login", "successfully Login");
        }
    };
    
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setLodrImg(true)
    //     try {
    //         const res = await API.post("/login", {
    //             email,
    //             password,
    //         })
    //         if (res.status === 200) {
    //             const { access_token, user } = res.data
    //             console.log("sdsds", res)
    //             // console.error("Error status:", access_token);
    //             // console.error("Error data:", user);
    //             sessionStorage.setItem('access_token', JSON.stringify(access_token));
    //             sessionStorage.setItem('user', JSON.stringify(user));
    //             localStorage.setItem("access_token", JSON.stringify(access_token));
    //             window.location.href = '/dashboard';
    //             setLodrImg(false)
    //         } else {
    //             console.log('Login failed')
    //             setLodrImg(false)
    //         }
    //     }
    //     catch (err) {
    //         const { status } = err.response;
    //         const { email, password, error } = err.response.data;
    //         if (status === 400 || status === 401 || status === 500) {
    //             if (email || password) {
    //                 setErrorEml(email)
    //                 setErrorPswd(password)
    //                 setErrorFld(true)
    //                 setLodrImg(false)
    //             }
    //             else if (error) {
    //                 setErrorEml(error)
    //                 setErrorPswd(error)
    //                 setErrorFld(true)
    //                 setLodrImg(false)
    //             }
    //         }
    //     }
    //     if (rememberMe) {
    //         localStorage.setItem("login", "successfully Login");
    //     }
    // };
    return (
        <div className="lgn_frm">
            <div className="hedr_wppr">
                <Container>
                    <div className="hdr-cncnt_wppr">
                        <div className="logo">
                            <Link to={"/"}>
                                OTT
                            </Link>
                        </div>
                        <div className="lgn_btn_wppr">
                            <button type="button" onClick={(e) => LgnFrm(e)}>Login</button>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="lgn_bnnr_wppr">
                <div className="bnnr_img">
                    <img src={Lognbgimg} alt="" />
                </div>
                <div className="bnnr_txt_wppr">
                    <Container>
                        <div className="title">
                            <h1>Beyond-stream </h1>
                            <small>CMS</small>
                        </div>
                    </Container>
                </div>
            </div>
            <div className="lgn_txt_cncnt_wppr">
                <Container>
                    <div className="jnry_txt_wppr">
                        <div className="title">
                            <h2>Embarking on a New Journey</h2>
                            <p>Unleash the Power of Control with our Super Admin CMS for OTT! Elevate your content management experience to unprecedented heights, where seamless control meets unparalleled efficiency. Empower yourself with intuitive tools, real-time analytics, and dynamic customization options, putting you in the driver's seat of your OTT platform. Dive into a world of limitless possibilities as you effortlessly manage, curate, and optimize your content. Revolutionize your OTT journey with the ultimate Super Admin CMS – where innovation meets administration, and where you become the true hero of your content universe.</p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className={loginOpup ? "lgn_pop_wppr" : "lgn_pop_wppr show_lgn_frm"} onClick={ClsFrm} >
                <div className="lgn_frm_wppr" onClick={(e) => stopPopbx(e)}>
                    <button className="lgn_clsBtn" onClick={ClsFrm}></button>
                    <div className="title">
                        <h5>Welcome to <em>Super Admin OTT CMS</em> </h5>
                        <h3>Login</h3>
                    </div>
                    <div className="fldst_wppr">
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <label>Enter your user name </label>
                                <div className={errorFld ? "txt_fld_wppr error_imput" : "txt_fld_wppr"}>
                                    <em><img src="asset/icon/user.svg" alt="" type="image/svg+xml" /> </em>
                                    <input type="text"  className="lgn_frm_txt" name="email" placeholder="@email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <p className="error_msg">{errorEml}</p>
                            </fieldset>
                            <fieldset>
                                <label>Enter your Password</label>
                                <div className={errorFld ? "txt_fld_wppr error_imput" : "txt_fld_wppr"}>
                                    <em> <img src="asset/icon/key.svg" alt=""  type="image/svg+xml"/> </em>
                                    <input type="password" className="lgn_frm_txt" name="password" placeholder="**********" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <p className="error_msg">{errorPswd}</p>
                            </fieldset>
                            <div className="rmbr_me_wppr">
                                <div className="rmbr_chckbx">
                                    <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="rmbr_chck_txt" />
                                    <span></span>
                                    <p>Remember Me</p>
                                </div>
                            </div>
                            <button type="submit" className="lgn_btn">
                            Login                            
                            </button>
                        </form>
                    </div>                
                    {
                        lodrImg && <div className="logn_ldr"> <Loader /> </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login;