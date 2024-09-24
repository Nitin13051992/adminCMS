/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlay, faPenToSquare, faPause} from '@fortawesome/free-solid-svg-icons'
import ModuleFrom from '../components/ModuleFrom';
import Loader from '../components/LoaderPage';
import moment from 'moment';
function Modules({data}) {
    const apiName = "modules";
    const modeName = "GET";
    const [method,setMethod] = useState();
    const [publishersData, setPublishersData] = useState([]);
    const [filtrdata, setFiltrData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [edtData, setEditData] =  useState(false)
    const [edtVluData, setEditVluData] =  useState('')
    const [fromHading,setFromHading] = useState('')
    const [edtID, setEditID] =  useState(null)
    const [popup, setPopUp] = useState();
    const [deletePop, setDeletePop] = useState(false)
    const [cnfrmDlt, setCnfrmDlt] = useState();
    const recordsPrePage = 15;
    const lastIndex = currentPage * recordsPrePage;
    const firstIndex = lastIndex - recordsPrePage;
    const npage = Math.ceil(filtrdata.length / recordsPrePage);
    const number = [...Array(npage + 1).keys()].slice(1);
   
    useEffect(() => {
        document.querySelectorAll(".dshbrd_wppr")[0].classList.add('overflow-hidden');        
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, firstIndex, lastIndex]);
    const fetchData = async () => {
        try {
            const matches = await data.getAllAPIPage("modules", "GET");
            if (matches.module_list) {
                const apiData = matches.module_list,
                    filterData = apiData.filter(({ module_name }) => module_name.toLowerCase().search(searchValue) !== -1),
                    pagentnData = filterData.slice(firstIndex, lastIndex)
                setPublishersData(pagentnData);
                setFiltrData(filterData)
            }
            else{
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/";
            }
        } catch (error) {
            if (error.message === "Unauthenticated") {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/";
            }
        }
    };
    const formatDate = (records) => {
        return moment(records).format('DD-MM-YYYY');
    };
    const HandleSearch = (event) => {
        setSearchValue(event.target.value);
    };
    const PrePage = (e) => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    };
    const ChnageCPage = (id) => {
        setCurrentPage(id)
    };
    const NxtPage = (e) => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    };
    const PopUpFun = () => {
        setPopUp(true);
        setMethod('POST');
        setDeletePop(true);
        setEditData(false);
        setFromHading("Create Module")
    }
    const ClsPopFrom = (data) => {
        setPopUp(data)
    }    
    const handleDeleteRow = async (targetIndex) =>{
        setPopUp(true);
        setMethod('DELETE');
        setDeletePop(false);
        setCnfrmDlt(targetIndex)
        setFromHading("Are you sure you want to delete this Module")
    }
    const dltRow = async (event) =>{        
        if(!event){
            const slctRow = publishersData[cnfrmDlt],
                SlctDltId = slctRow.module_id   
            try {
                await data.getAllAPIPage(apiName, method, null , null, null, SlctDltId)
                setPopUp(false);
                setDeletePop(true)
                fetchData(apiName, modeName);
            } 
            catch (error) {
                console.error("error-", error);
            }    
        }
    }
    const EditRow = (ID) =>{
        const slctRow = publishersData[ID],
            SlctDltId = slctRow.module_id;
        setPopUp(true);
        setMethod('PUT');
        setEditData(true);
        setDeletePop(true);
        setEditID(SlctDltId);
        setEditVluData(slctRow);
        setFromHading("Edit Module From")   
    }
    const handleEditRow = async (edtTargetValue) =>{
        try {
            await data.getAllAPIPage(apiName, method, null, edtID, edtTargetValue);
            fetchData(apiName, modeName);
            setPopUp(false);
        } catch (error) {
            console.error("error-", error);
        }
    }
    const fromSbmtDat = async (insrtData) =>{
        try {
            await data.getAllAPIPage(apiName, method, insrtData);
            fetchData(apiName, modeName);
            setPopUp(false);
        } catch (error) {
            console.error("error-", error);
        }
    }
    return (
        <Layout>
            <div className='pblsh_lst_wppr'>
                <div className="title d-flex align-items-center">
                    <h1>Module Setting</h1>
                    <button type='button' className='cmn_btn add_mr_btn' onClick={PopUpFun}>+</button>
                </div>
                <div className='pg_fltr_wppr'>
                    <div className='pgnatn_wppr'>
                        <div className='title'>
                            <p>{`Showing- ${currentPage} to ${recordsPrePage} Of ${filtrdata.length}`}</p>
                        </div>
                        <div className='pagination'>
                            <ul>
                                <li className='btn_cmn' onClick={PrePage}></li>
                                {
                                    number.map((n, i) => {
                                        return (
                                            <li className={`${currentPage === n ? 'active' : ''}`} onClick={() => ChnageCPage(n)} key={i}>{n}</li>
                                        )
                                    })
                                }
                                <li className='btn_cmn' onClick={NxtPage}></li>
                            </ul>
                        </div>
                    </div>
                    <div className='tbl_srch_wppr'>
                        <div className="srch_wppr">
                            <button type="button" className="srch_icn">
                                <img src="asset/images/index/search.svg" alt="" />
                            </button>
                            <input type="text" className="srch_txt" placeholder="Search" onChange={HandleSearch} />
                        </div>
                    </div>
                </div>
                <div className='pblsh_lst_tbl_wppr'>
                    <table>
                        <thead>
                            <tr>
                                <th className='text-center'>Module  ID</th>
                                <th>Module Name</th>
                                <th>ModuleTag</th>
                                <th>Create  Date</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(publishersData).length > 0 ? publishersData.map((data, index) => {
                                    const { module_id, module_name, tag, created_at, status} = data
                                    return (
                                        <tr key={index}>
                                            <td className='text-center'>{module_id}</td>
                                            <td>{module_name}</td>
                                            <td>{tag}</td>
                                            <td>{formatDate(created_at)}</td>
                                            <td className={`${status === "1" ? "Active" : 'Pending'} text-center`}>{
                                                status === "1" ? "Active" : 'Inactive'
                                            }</td>
                                            <td>
                                                <div className='act_btn_wppr text-center'>
                                                    <Link to={''}>
                                                        {
                                                            status === "1" ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />
                                                        }
                                                    </Link>
                                                    <Link to={''}><FontAwesomeIcon icon={faPenToSquare} onClick={() => EditRow(index)} /> </Link>
                                                    <Link to={''} onClick= {(e) => handleDeleteRow(index)}><FontAwesomeIcon icon={faTrashCan} /> </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                : <tr>
                                    <td colSpan="12"> 
                                        <Loader />
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            {
                popup && <ModuleFrom clsFrom={ClsPopFrom} editData={handleEditRow}  sbmtDat={fromSbmtDat} dltPop={deletePop} dltRowData={dltRow} edtfrom={edtData} edtVlueData={edtVluData} frmHdng={fromHading} />
            }
        </Layout>
    )
}

export default Modules
