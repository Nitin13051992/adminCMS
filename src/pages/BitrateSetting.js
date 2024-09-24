/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/LoaderPage';

import FromComponents from "../components/FromComponents";
function BitrateSetting({data}) {
    const [publishersData, setPublishersData] = useState([]);
    const [popup, setPopUp] = useState(false);
    const [prmstFrm, setPrmstnFrm] = useState(false);
    const [fromTitle, setFromTitle] = useState('');
    const [cnfrmDelete, setConfrmDelet] = useState(false)
    const [dltId, setDeleteID] = useState(null)
    const [method, setMethod] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
   

    useEffect(() => {
        document.querySelectorAll(".dshbrd_wppr")[0].classList.add('overflow-hidden');
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (insrtData = null, prmstnEdtID = null, edtData = null, SlctDltId = null) => {
        try {
            const matches = await data.getAllAPIPage("bitrate-setting", 'GET', insrtData, prmstnEdtID, edtData, SlctDltId);            
            if (matches) {
                setPublishersData(matches);
            }
            else{
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/";
            }
        } catch (error) {
            handleFetchError(error);
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/";
        }
    };

    const handleFetchError = (error) => {
        console.error("error-", error);
        if (error.message === "Unauthenticated.") {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/";
        }
    };

    const PopUpFun = (isOpen) => {
        setFromTitle("New Bitrate");
        setPopUp(isOpen);
        setConfirmDelete(false);
        setPrmstnFrm(true);
        setMethod('POST');
    };

    const closeModal = (isOpen) => {
        setPopUp(isOpen);
    };

    const toggleSubMenu = (e) => {
        const currentBtnClick = e.target;
        const siblingChild = currentBtnClick.offsetParent?.parentElement?.nextElementSibling;
        
        if (!siblingChild) return; 

        if (siblingChild.classList.contains("active")) {
            siblingChild.classList.remove('active');
            currentBtnClick.classList.remove('active');
        } else {
            const activeElements = document.getElementsByClassName('drp_dwn_subUsr_wppr');
            const activeBtn = document.getElementsByClassName('drp_btn');
            Array.from(activeElements).forEach(element => element.classList.remove('active'));         
            Array.from(activeBtn).forEach(element => element.classList.remove('active'));         
            siblingChild.classList.add('active');
            currentBtnClick.classList.add('active');
        }
    };

    const insrtDataFnctn = async(insrtData)=>{    
        try {
            await data.getAllAPIPage("bitrate-setting", 'POST', insrtData);
            fetchData();
            setPopUp(false);
        } catch (error) {
            console.error("Error inserting data:", error);
        }
    };

    const CnfrmDltPop = (event) =>{
        setPopUp(true);
        setConfrmDelet(true);
        setPrmstnFrm(false);
        setDeleteID(event);
        setFromTitle("Are you sure you want to delete this Menu")
    }
    const dltRowData =  async (event) =>{
        if(event){
            try{
                await data.getAllAPIPage("bitrate-setting", "DELETE", null, null, null, dltId);
                setConfirmDelete(false);
                setPopUp(false);
                fetchData();
            }
            catch(error){
                console.error("error massage", error)
            }
        }
    }

    return (
        <Layout>
            <div className='pblsh_lst_wppr'>
                <div className="title d-flex align-items-center flex-wrap">
                    <h1>Video Profile</h1>
                    <button type='button' className='cmn_btn add_mr_btn' onClick={() => PopUpFun(true)}>+</button>
                </div>
               <div className='bitrt_wppr'>
                    <div className="vod_tbl_wppr" >
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='text-center'>S.No</th>
                                    <th>Publisher ID</th>
                                    <th>Client Name</th>
                                    <th colSpan="10">Email Address </th>                                    
                                </tr>
                            </thead>
                            {
                                Object.keys(publishersData).length > 0 && Object.keys(publishersData).length > 0 ?                             
                                    <tbody>
                                    {
                                        Object.entries(publishersData.grouped_data).map((data, index) => {
                                            const {client_email, client_name, publisher_id} = data[1]
                                            return(
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td className='text-center'>
                                                            {data[1].profiles.length > 0 &&
                                                                <div className='drp_btn' onClick={toggleSubMenu}>
                                                                    <button type='button'></button>
                                                                </div>
                                                            }
                                                        </td>
                                                        <td className='text-center'>{index + 1}</td>
                                                        <td>{publisher_id}</td>
                                                        <td>{client_name}</td>
                                                        <td colSpan="10">{client_email}</td>
                                                    </tr>
                                                    {data[1].profiles.length > 0 &&
                                                        <tr className='drp_dwn_subUsr_wppr'>
                                                            <td colSpan={12}>
                                                                <div className='subUsr_wppr'>
                                                                    <table>
                                                                        <thead>
                                                                            <tr>
                                                                                <th className='text-center'>S.No</th>
                                                                                <th>Template name</th>
                                                                                <th>ABR ( kbps)</th>
                                                                                <th>VBR ( kbps)</th>
                                                                                <th>V Profile</th>
                                                                                <th>Type</th>
                                                                                <th>Resolution(Px)</th>
                                                                                <th className='text-center'>Status</th>
                                                                                <th className='text-center'>Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {data[1].profiles.map((subdata, subIndex) => {
                                                                                const {abr, height, partnerid, status, template_name, vbr, vlevel, vprofile, width, pfid} = subdata
                                                                                return (
                                                                                    <tr key={subIndex}>
                                                                                        <td className='text-center'>{subIndex + 1}</td>
                                                                                        <td>{template_name}</td>
                                                                                        <td>{abr}</td>
                                                                                        <td>{vbr}</td>
                                                                                        <td>{vprofile}</td>
                                                                                        <td>{vlevel}</td>
                                                                                        <td>{width} X {height}</td>
                                                                                        <td className='text-center'>{status}</td>
                                                                                        <td className='text-center'>
                                                                                            <div className='act_btn_wppr text-center'>
                                                                                                <Link style={{"color" : "#DC323A"}} to={''} onClick={()=> CnfrmDltPop(pfid) }><FontAwesomeIcon icon={faTrashCan} /> </Link>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            }
                                                                            )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>  
                                                    }
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    </tbody>                                
                                : 
                                <tr>
                                    <td colSpan="9">
                                        <Loader /> 
                                    </td>
                                </tr>
                            }
                        </table>
                    </div>  
               </div>
            </div>
            {popup && (
                <FromComponents
                    popTitle={fromTitle}
                    clsPopup={closeModal}
                    bitratFrm={prmstFrm}
                    bitrtAPIData={publishersData.partnerid}
                    cnfrmPop={cnfrmDelete}
                    insrtDataFrm={insrtDataFnctn}
                    dltRowFun={dltRowData}
                    // insrtDataFrm={insrtNwFun}
                    // dltRowFun={dltRowData}
                    // cnfrmPop={confirmDelete}
                    // prmstnEdtData={prmtnEdtClckData}
                    // edtPrmtnData={EdtFromData}
                    // openshwEdtFrm={shwEdtFrm}
                />
            )}
        </Layout>
    );
}

export default BitrateSetting
