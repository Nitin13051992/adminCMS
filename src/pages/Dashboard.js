/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import ProgressLine from "@ramonak/react-progress-bar";
import ProgressBar from '../components/ProgressBar';


function Dashboard({data, apiData}) {    
    const [trscdngcrt, setTrscdngcrt] = useState([]);   
    const drpDwnSlct = {
        width: "auto",
        display: "inline-block",
        position: "relative"
    }
    useEffect(()=>{    
        fetchData( );  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const PrfrmncOvrvw = ({ title, value, cart_icn }) => (
        <div className='clnt_stus' >
            <div className="title">
                <p>{title}</p>
                <h6>{value}</h6>
            </div>
            <div className='clnt_icn'>
                <span>
                    <img src={cart_icn} alt="" />
                </span>
            </div>
        </div>
    );
    const TrnscdngUsr = ({ title, crtvlus, imgTitl }) => (
        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 px-3 mt-4'>
            <div className='trscdng_crt'>
                <div className="title">
                    <small>{title}</small>
                    <h4>{crtvlus}</h4>
                </div>
                <div className='icn_img'>
                    <img src={imgTitl} alt='' />
                </div>
            </div>
        </div>
    );
    const fetchData = async () => {
        try {
            const matches = await apiData.getAllAPIPage("publisher-data", "GET");
            if (matches) {
                const apiData = matches.data_counts;
                console.log("apiData", apiData)
                setTrscdngcrt(apiData);
                
            }
            else{
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/";
            }
        } catch (error) {
            console.error("error-", error);
            if (error.message === "Unauthenticated.") {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/";
            }
        }
    };
    return (
        <Layout>
            <div className='dshbrd_cnct_wppr'>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 px-3 mb-3 d-flex '>
                    <div className='hdn_wppr title d-flex align-items-end justify-content-start'>
                        <h1 >Dashboard </h1>
                        <small>OTT  Client Overview</small>
                    </div>
                    {/* <div style={drpDwnSlct}>
                        <div className='drp_dwn_wppr'>
                            <select name="select">
                                <option value={"select"}>select</option>
                                <option value={"All"}>All</option>
                                <option value={"Amrita"}>Amrita</option>
                                <option value={"1OTT"}>1OTT</option>
                            </select>
                        </div>
                    </div> */}
                </div>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 px-3 mb-4'>
                    <div className='clnt_crt_wppr clnt_hght'>
                        <div className='title '>
                            <small>Performance Overview</small>
                        </div>
                        <div className='clnt_wppr'>
                            <PrfrmncOvrvw title="Total Publisher" value={trscdngcrt.publisher_count} cart_icn="asset/images/dashboard/Publisher_icn.svg" />
                            <PrfrmncOvrvw title="Total Menus" value={trscdngcrt.menu_count} cart_icn="asset/images/dashboard/Menus_icn.svg" />
                            <PrfrmncOvrvw title="New Client" value={trscdngcrt.letestuser_count}  cart_icn="asset/images/dashboard/Modules_icn.svg"/>
                            <PrfrmncOvrvw title="Total Modules" value={trscdngcrt.module_count} cart_icn="asset/images/dashboard/Customers_icn.svg" />                            
                        </div>

                    </div>
                </div>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4 d-flex '>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 px-3'>
                        <div className='clnt_crt_wppr str_bx_wprr'>
                            <div className='title d-flex align-items-start justify-content-between  mb-0'>
                                <h5>DB Storage</h5>
                                <span>
                                    <img src="asset/images/dashboard/DB_strg_icn.svg" alt='' />
                                </span>
                            </div>
                            <div className='prgsbr_wppr'>
                                <div className='prgs_br_wppr'>
                                    <ProgressBar rangData={57.6} text={`57.6`} totalPrstng={100} crtColor={"#D80032"} />
                                </div>
                                <div className='spc_wppr'>
                                    <div className='title'>
                                        <h4>NA <em>MB</em></h4>
                                        <p>Total Space</p>
                                    </div>
                                    <div className='title'>
                                        <h4>{trscdngcrt.uses_db_Storage} </h4>
                                        <p>Used</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 px-3'>
                        <div className='clnt_crt_wppr str_bx_wprr'>
                            <div className='title d-flex align-items-start justify-content-between  mb-0'>
                                <h5>CDN Usage</h5>
                                <span>
                                    <img src="asset/images/dashboard/CDN_icn.svg" alt='' />
                                </span>
                            </div>
                            <div className='prgsbr_wppr'>
                                <div className='prgs_br_wppr'>
                                    <ProgressBar textData={"NAN"} totalPrstng={100} crtColor={"#0791F8"} />
                                </div>
                                <div className='spc_wppr'>
                                    <div className='title'>
                                        <h4>NA <em>MB</em></h4>
                                        <p>Total Space</p>
                                    </div>
                                    <div className='title'>
                                        <h4>{trscdngcrt.uses_cloundfront} </h4>
                                        <p>Used</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 px-3'>
                        <div className='clnt_crt_wppr str_bx_wprr'>
                            <div className='title d-flex align-items-start justify-content-between  mb-0'>
                                <h5>S3 Bucket</h5>
                                <span>
                                    <img src="asset/images/dashboard/DB_strg_icn.svg" alt='' />
                                </span>
                            </div>
                            <div className='prgsbr_wppr'>
                                <div className='prgs_br_wppr'>
                                    <ProgressBar rangData={380} totalPrstng={1000} crtColor={"#EA9010"} />
                                </div>
                                <div className='spc_wppr'>
                                    <div className='title'>
                                        <h4>NA <em>MB</em></h4>
                                        <p>Total Space</p>
                                    </div>
                                    <div className='title'>
                                        <h4>{trscdngcrt.uses_s3_storage} </h4>
                                        <p>Used</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 px-3 mb-5'>
                    <div className='clnt_crt_wppr trdng_usr_wppr'>
                        <div className='title'>
                            <h5>Transcoding Uses</h5>
                        </div>
                        <div className="cdn_cnct_wppr ">
                            <TrnscdngUsr title="Total Success" crtvlus={trscdngcrt.success} imgTitl="asset/images/dashboard/trnscdng_1.svg"  />
                            <TrnscdngUsr title="Total Inprogress" crtvlus={trscdngcrt.in_process} imgTitl="asset/images/dashboard/trnscdng_2.svg"  />
                            <TrnscdngUsr title="Total Failed" crtvlus={trscdngcrt.error} imgTitl="asset/images/dashboard/trnscdng_3.svg"  />
                            <TrnscdngUsr title="Total Queue" crtvlus={trscdngcrt.queued} imgTitl="asset/images/dashboard/trnscdng_4.svg"  />
                        </div>
                    </div>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 px-3'>
                    <div className='clnt_crt_wppr str_bx_wprr'>
                        <div className='title d-flex align-items-start justify-content-between  mb-0'>
                            <h5>Nas Server</h5>
                            <span>
                                <img src="asset/images/dashboard/nas_icn.svg" alt='' />
                            </span>
                        </div>
                        <div className='prgsbr_wppr'>
                            <div className='nas_img'>
                                <img src='asset/images/dashboard/nas_img.svg' alt='' />
                            </div>
                            <div className='prgs_br_wppr w-75 my-4'>
                                <ProgressLine completed={75} strokeWidth={13} customLabel=" " baseBgColor={"#D9D8D8"} bgColor={'#9CC7E9'} height={15} animateOnRender={true} />
                            </div>
                            <div className='spc_wppr'>
                                <div className='title'>
                                    <h4>NA<em>MB</em></h4>
                                    <p>Total Space</p>
                                </div>
                                <div className='title'>
                                    <h4>{trscdngcrt.uses_nas_storage}</h4>
                                    <p>Used</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

   

    

}

export default Dashboard
