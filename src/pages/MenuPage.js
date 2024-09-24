/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlay, faPenToSquare, faL} from '@fortawesome/free-solid-svg-icons';
import MenuForm from '../components/MenuFrom';
import Loader from '../components/LoaderPage';
import moment from 'moment';
function MenuPage({data}) {
    const apiName = "menus";
    const menuCtgry = "menus-category";
    const modeName = "GET";
    const [method,setMethod] = useState()
    const [publishersData, setPublishersData] = useState([]);
    const [filtrdata, setFiltrData] = useState([]);    
    const [menucategory, setMenuCategoryData] =  useState([])
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [fromTitle, setFromTitle] = useState('')
    const [edtFrom, setEdtForm] = useState();
    const [edtvlue, setedtVlu] = useState(''); 
    const [ediID, setEditID] = useState(null);
    const [dltId, setDeleteID] = useState(null)
    const [popup, setPopUp] = useState(false);
    const [cnfrmDelete, setConfrmDelet] = useState(true)
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
            const matches = await data.getAllAPIPage("menus", "GET");
            const mcategory = await data.getMenuCat("menus-category", "GET");
            if (matches.menu_list) {
                const apiData = matches.menu_list,
                filterData = apiData.filter(({ mname }) => mname.toLowerCase().search(searchValue) !== -1),
                pagentnData = filterData.slice(firstIndex, lastIndex);
                setPublishersData(pagentnData);
                setFiltrData(filterData)
            }
            else{
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/";
            }
            setMenuCategoryData(mcategory.menu_category)
        } catch (error) {
            console.error("error-", error);
            if (error.message === "Unauthenticated.") {
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
        setEdtForm(false);
        setMethod('POST');
        setFromTitle("Create New Menu")
    }
    const ClsPopFrom = (data) => {
        setPopUp(data)
    }
    const insrtDataFnctn = async(insrtData, ctgryID)=>{
        try{
            await data.getAllAPIPage(apiName, method, insrtData, ctgryID)
            fetchData(apiName, modeName, menuCtgry);
            setPopUp(false);
        }
        catch(error){
            console.error("error", error)
        }
    }
    const EdtDataFun =(indxID) =>{
        const EdtRow = publishersData[indxID],
            SlctDltId = EdtRow.mid  
        setEditID(SlctDltId);
        setEdtForm(true);
        setConfrmDelet(true);
        setPopUp(true);
        setMethod('PUT');
        setedtVlu(EdtRow);
        setFromTitle("Edit Menu From")
    }
    const edtMdlData = async(edtData) =>{
        try{
            await data.getAllAPIPage(apiName, method, null, ediID , edtData)
            setPopUp(false);
            fetchData(apiName, modeName, menuCtgry );
        }
        catch(error){
            console.error("error", error)
        }
    }
    const CnfrmDltPop = (event) =>{
        setConfrmDelet(false);
        setPopUp(true);
        setDeleteID(event);
        setMethod('DELETE');
        setFromTitle("Are you sure you want to delete this Menu")
    }
    const dltRowData =  async (event) =>{
        if(event){
            const EdtRow = publishersData[dltId],
            SlctDltId = EdtRow.mid  
            try{
                await data.getAllAPIPage(apiName, method, null , null, null, SlctDltId)
                setConfrmDelet(true);
                setPopUp(false);
                fetchData(apiName, modeName, menuCtgry );
            }
            catch(error){
                console.error("error massage", error)
            }
        }
    }

    return (
        <Layout>
            <div className='pblsh_lst_wppr'>
                <div className="title d-flex align-items-center">
                    <h1>Menu Setting</h1>
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
                                <th className='text-center'>Menu ID</th>
                                <th>Menu Name</th>
                                <th>Page Link</th>
                                <th>Permission</th>
                                <th >Icon</th>
                                <th>Create  Date</th>
                                <th  className='text-center'>Status</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(publishersData).length > 0 ? publishersData.map((data, index) => {
                                    const { mid, mname, menu_url,permission, created_at, icon_class, mstatus} = data
                                    return (
                                        <tr key={index}>
                                            <td className='text-center'>{mid}</td>
                                            <td>{mname.charAt(0).toUpperCase() + mname.slice(1)}</td>
                                            <td>{menu_url}</td>
                                            <td>{permission}</td>
                                            <td>{icon_class}(<i className={`${icon_class}`} title={icon_class} ></i>) </td>
                                            <td>{formatDate(created_at)}</td>
                                            <td className={`${mstatus === "1" ? "Active" : 'Pending'} text-center px-4`}>{
                                                mstatus === "1" ? "Active" : 'Pending'
                                            }</td>
                                            <td>
                                                <div className='act_btn_wppr text-center'>
                                                   <Link to={''}><FontAwesomeIcon icon={faPlay} /> </Link>
                                                   <Link to={''} onClick={() => EdtDataFun(index)}><FontAwesomeIcon icon={faPenToSquare} /> </Link>
                                                   <Link to={''} onClick={()=> CnfrmDltPop(index) }><FontAwesomeIcon icon={faTrashCan} /> </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                : <tr><td colSpan="12"> <Loader /></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                popup ? <MenuForm clsPopup={ClsPopFrom} catgryData={menucategory} insrtData={insrtDataFnctn} edtFromOpn={edtFrom} editData={edtMdlData} edtfrmVlu={edtvlue} cnfrmPop={cnfrmDelete} dltRow={dltRowData} popTitle={fromTitle} /> : ''
            }
        </Layout>
    )
}

export default MenuPage
