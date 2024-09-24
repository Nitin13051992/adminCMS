/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import FromComponents from '../components/FromComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import imgURL from '../asset/images/roles/roles.svg'
import Loader from '../components/LoaderPage';
function Rolse({data}) {
    const [publishersData, setPublishersData] = useState([]);
    const [filtrdata, setFiltrData] = useState([]);    
    const [popup, setPopUp] = useState(false);
    const [dltID, setDltID] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [rlsPrmtn, setRlsPrmtn] = useState(false)
    const [cnfrmDelete, setConfrmDelet] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [fromTitle, setFromTitle] = useState('');
    const [edtIDData, setEditIDData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [rlsPrmstn, setRlsPrmstn] = useState();
    const recordsPrePage = 15;
    const lastIndex = currentPage * recordsPrePage;
    const firstIndex = lastIndex - recordsPrePage;
   
    useEffect(() => {
        document.querySelectorAll(".dshbrd_wppr")[0].classList.add('overflow-hidden');        
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, firstIndex, lastIndex]);
    const fetchData = async () => {
        try {
            const matches = await data.getAllAPIPage("roles", "GET");
            if (matches.role_list) {
                const apiData = matches.role_list,
                filterData = apiData.filter(({ name }) => name.toLowerCase().search(searchValue) !== -1),
                pagentnData = filterData.slice(firstIndex, lastIndex);
                setPublishersData(pagentnData);
                setFiltrData(filterData)
                console.log("apiData", apiData)
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
    const dltRolesFunctn = (event) => {
        setPopUp(true);
        setConfrmDelet(true);
        setRlsPrmtn(false)
        setDltID(event);
        setFromTitle("Are you sure you want to delete this Publisher")        
    }
    
    const ClsPopFrom = (data) => {
        setPopUp(data)
    }
    const dltRolesData =  async (event) =>{
        console.log("dltRolesData", event)
        if(event){
            const EdtRow = publishersData[dltID],
                SlctDltId = EdtRow.id 
            try{
                await data.getAllAPIPage("roles", "DELETE", null , null, null, SlctDltId)
                setConfrmDelet(true);
                setPopUp(false);
                fetchData("roles", "GET");
            }
            catch(error){
                console.error("error massage", error)
            }
        }
    }
    const PopUpFun = (event) => {
        setPopUp(event);
        setRlsPrmstn('');
        setRlsPrmtn(event);
    }
    const edtFunData = async (event) =>{
        const EdtId = publishersData[event].id
        if(EdtId){
            const response = await data.getAllAPIPage("roles", "GET", null, EdtId);
            setRlsPrmstn(response)
            setPopUp(true)
            setRlsPrmtn(true)
            setEditIDData(EdtId)
            setFromTitle("Edit permission Roles") 
        }
    }
    const insertAPIData = async (insertData) => {
        try {
            await data.getAllAPIPage("roles", 'POST', insertData);
            fetchData("roles", "GET");
            setPopUp(false);
        } catch (error) {
            console.error("Error inserting data:", error);
        }
    };
    const EdtRolsData = async(event) =>{
        try{
            await data.getAllAPIPage("roles", "PUT", null, edtIDData , event)
            setPopUp(false);
            fetchData("roles", "GET" );
        }
        catch(error){
            console.error("error", error)
        }
    }
   return (
    <Layout>
        <div className='pblsh_lst_wppr'>
            <div className="title d-flex align-items-center">
                <h1>Roles</h1>
                <button type='button' className='cmn_btn add_mr_btn' onClick={() => PopUpFun(true)}>+</button>
                <div className='rls_prmstn_wppr  d-flex justify-content-end'>
                    <Link to={'/Permissions'} className='cmn_btn'> + Permissions</Link>
                </div>
            </div>            
            <div className='pblsh_lst_tbl_wppr'>
                <div className='rls_wppr'>
                {
                    Object.keys(publishersData).length > 0 ? publishersData.map((data, index) => {
                        const { name, guard_name} = data
                        return (
                            <div  className='col-xl-3 col-lg-4 col-md-5 col-sm-6 col-12' key={index}>
                                <div className='rls_crt'>
                                        <div className='rls_icn_wppr'>
                                            <img src={imgURL} alt='' />
                                        </div>
                                        <div className='title'>
                                            <h6>{name.charAt(0).toUpperCase() + name.slice(1)}</h6>
                                            <small>{guard_name}</small>                                           
                                        </div>
                                        <div className='rls_drp_dwn'>
                                            <ul>
                                                <li >
                                                    <Link  onClick={() => edtFunData(index)} ><FontAwesomeIcon icon={faPenToSquare} /> </Link>
                                                </li>
                                                <li>
                                                    <Link to={""} onClick={() => dltRolesFunctn(index) }><FontAwesomeIcon icon={faTrashCan} />  </Link>
                                                </li>
                                            </ul>                                            
                                        </div>
                                </div>
                            </div>                            
                        )
                    })
                    : <div className='w-100'><Loader /> </div>
                }
                {
                    popup ? <FromComponents clsPopup={ClsPopFrom}  cnfrmPop={cnfrmDelete} dltRowFun={dltRolesData} popTitle={fromTitle} rlsPrmtnPop={rlsPrmtn}  rlsPrmstnData={rlsPrmstn}  rlsInsrtVlu={insertAPIData} rlsEdtData={EdtRolsData}  /> : ''
                }    
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Rolse
