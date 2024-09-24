/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import FromComponents from '../components/FromComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/LoaderPage';
import { faTrashAlt, faPlus, faLock, faPenSquare, faListCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function Publishers({ data }) {
    const [publishersData, setPublishersData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [, setShowEditForm] = useState(false);
    const [editID, setEditID] = useState('');
    const [editData, setEditData] = useState(null);
    const [popup, setPopup] = useState(false);
    const [rolesPopup, setRolesPopup] = useState(false);
    const [cmsPrmstn, setCMSPrmtn] = useState(false);
    const [deleteID, setDltId ] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [formTitle, setFormTitle] = useState('Add New Publisher');
    const [, setErrorValidation] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [cmsRolPrmtn, setCmsRolPrmtn] = useState(null)
    const recordsPerPage = 15;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const fetchData = async () => {
        try {
            const response = await data.getAllAPIPage("publishers", "GET");
            if (response.data) {
                const apiData = response.data;
                const filteredData = apiData.filter(({ email }) => {
                    return email && email.toLowerCase().includes(searchValue.toLowerCase());
                });
                setFilteredData(filteredData);
                const paginatedData = filteredData.slice(firstIndex, lastIndex);
                setPublishersData(paginatedData);
            }
            else{
                // localStorage.clear();
                // sessionStorage.clear();
                // window.location.href = "/";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.message === "Unauthenticated.") {
                // localStorage.clear();
                // sessionStorage.clear();
                // window.location.href = "/";
            }
        }
    };    

    useEffect(() => {
        document.querySelectorAll(".dshbrd_wppr")[0].classList.add('overflow-hidden');
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, firstIndex, lastIndex]);

    const formatDate = (date) => {
        return moment(date).format('DD-MM-YYYY');
    };

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const togglePopup = (isOpen) => {
        setFormTitle("Add New Publisher");
        setConfirmDelete(false);
        setPopup(isOpen);
        setEditData('')
    };

    const closeModal = (isOpen) => {
        setPopup(isOpen);
        setCMSPrmtn(false);
    };
    const deleteRow = async (event) => {
        if (deleteID !== null) {
            const selectedPublisher = publishersData[deleteID];
            const publisherIdToDelete = selectedPublisher.id;
            try {
                await data.getAllAPIPage("publishers", "DELETE", null, null, null, publisherIdToDelete);
                setConfirmDelete(true);
                setPopup(false);
                fetchData();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };
    const editButton = async (index) => {
        setActiveIndex(activeIndex === index ? null : index);
        const selectedPublisher = publishersData[index],
            publisherIdToEdit = selectedPublisher.id;
        try {
            const response = await data.getAllAPIPage("publishers", "GET", null, publisherIdToEdit);
            console.log('response', response)
            setPopup(true);
            setShowEditForm(true);
            setEditData(response);
            setEditID(publisherIdToEdit);
            setConfirmDelete(true);
            setActiveIndex(null);
            setConfirmDelete(false);
            setFormTitle("Edit Publisher Form");
        } catch (error) {
            console.error("Error editing data:", error);
        }
    };

    const insertAPIData = async (insertData) => {
        try {
            await data.getAllAPIPage("publishers", 'POST', insertData);
            fetchData();
            setPopup(false);
        } catch (error) {
            setErrorValidation(true);
            console.error("Error inserting data:", error);
        }
    };

    const assignPermission = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
        const selectedPublisher = publishersData[index];
        setFormTitle('Assign Permission Role');
        setCmsRolPrmtn(selectedPublisher)
        setConfirmDelete(false)
        setCMSPrmtn(true);
        setPopup(true);
        
    };

    const toggleSubMenu = (e) => {
        const currentBtnClick = e.target;
        const siblingChild = currentBtnClick.offsetParent.parentElement.nextElementSibling;

        if (siblingChild.classList.contains("active")) {
            siblingChild.classList.remove('active');
            currentBtnClick.classList.remove('active');
        } else {
            siblingChild.classList.add('active');
            currentBtnClick.classList.add('active');
        }
    };

    const rowDltFunctn = (event) =>{
        setPopup(true);
        setDltId(event);
        setConfirmDelete(true);
        setFormTitle("Are to confirm delete this");
    }

    const renderSubMenu = (data, index) => {
        return (
            <div className='edt_row_drodwn' id={`${index}`} key={`submenu-${index}`}>
                <ul>
                    {/* <li>
                        <Link to={""}><FontAwesomeIcon icon={faListCheck} /> Manage</Link>
                    </li> */}
                    <li>
                        <Link to={"/menus-setting"}><FontAwesomeIcon icon={faPlus} /> Add Menu</Link>
                    </li>
                    <li>
                        <Link to={""}><FontAwesomeIcon icon={faPenSquare} /> VOD Profile</Link>
                    </li>
                    <li>
                        <Link to={"/permissions"}><FontAwesomeIcon icon={faPenSquare} /> Manage Permission</Link>
                    </li>
                    <li>
                        <Link to={"/roles"}><FontAwesomeIcon icon={faPenSquare} /> Manage Roles</Link>
                    </li>
                    {/* <li>
                        <Link to={""} onClick={() => assignPermission(index)}><FontAwesomeIcon icon={faPenSquare} /> Cms Permissions</Link>
                    </li> */}
                    {/* <li>
                        <Link to={""}><FontAwesomeIcon icon={faLock} /> Reset Password</Link>
                    </li> */}
                    {/* <li>
                        <Link to={""}><FontAwesomeIcon icon={faUser} /> User List</Link>
                    </li> */}
                    <li>
                        <Link to={"/payment-gateway"}><FontAwesomeIcon icon={faPenSquare} /> Payment Gateway</Link>
                    </li>
                    <li>
                        <Link to={""} onClick={() => editButton(index)}><FontAwesomeIcon icon={faPenSquare} /> Edit</Link>
                    </li>
                    <li>
                        <Link to={""} onClick={() => rowDltFunctn(index)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</Link>
                    </li>
                    
                </ul>
            </div>
        );
    };

    return (
        <Layout>
            <div className='pblsh_lst_wppr'>
                <div className="title d-flex align-items-center">
                    <h1>Publisher List</h1>
                    <button type='button' className='cmn_btn add_mr_btn' onClick={() => togglePopup(true)}>+</button>
                </div>
                <div className='pg_fltr_wppr'>
                    <div className='pgnatn_wppr'>
                        <div className='title'>
                            <p>{`Showing ${firstIndex + 1} to ${Math.min(lastIndex, filteredData.length)} of ${filteredData.length}`}</p>
                        </div>
                        <div className='pagination'>
                            <ul>
                                <li className='btn_cmn' onClick={() => setCurrentPage(currentPage - 1)}></li>
                                {
                                    [...Array(Math.ceil(filteredData.length / recordsPerPage)).keys()].map((n) => (
                                        <li className={`${currentPage === n + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(n + 1)} key={n}>{n + 1}</li>
                                    ))
                                }
                                <li className='btn_cmn' onClick={() => setCurrentPage(currentPage + 1)}></li>
                            </ul>
                        </div>
                    </div>
                    <div className='tbl_srch_wppr'>
                        <div className="srch_wppr">
                            <button type="button" className="srch_icn">
                                <img src="asset/images/index/search.svg" alt="" />
                            </button>
                            <input type="text" className="srch_txt" placeholder="Search" onChange={handleSearch} />
                        </div>
                    </div>
                </div>
                <div className='pblsh_lst_tbl_wppr'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th className='text-center'>User ID</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Company Name</th>
                                <th>Register Date</th>
                                <th>Publisher ID</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                publishersData.length > 0 ? publishersData.map((data, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td>
                                                {data.sub_users.length > 0 &&
                                                    <div className='drp_btn' onClick={toggleSubMenu}>
                                                        <button type='button'></button>
                                                    </div>
                                                }
                                            </td>
                                            <td className='text-center'>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.company_name}</td>
                                            <td>{formatDate(data.created_at)}</td>
                                            <td>{data.publisher_id}</td>
                                            <td className={`text-center ${data.status === "1" ? 'Active' : 'Pending'}`}>
                                                {data.status === "1" ? "Active" : "Inactive"}
                                            </td>
                                            <td className='text-center'>
                                                <button type="button" className={`tck_btn ${activeIndex === index ? "actv" : ""}`} onClick={() => handleToggle(index)}>
                                                    <i className="fa fa-circle crcl" aria-hidden="true"></i>
                                                    <i className="fa fa-circle crcl" aria-hidden="true"></i>
                                                    <i className="fa fa-circle crcl" aria-hidden="true"></i>
                                                </button>
                                                {activeIndex === index && renderSubMenu(data, index)}
                                            </td>
                                        </tr>
                                        {data.sub_users.length > 0 &&
                                            <tr className='drp_dwn_subUsr_wppr'>
                                                <td colSpan={12}>
                                                    <div className='subUsr_wppr'>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th className='text-center'>ID</th>
                                                                    <th>Name</th>
                                                                    <th>Email</th>
                                                                    <th>Company Name</th>
                                                                    <th>Register Date</th>
                                                                    {/* <th>Publisher ID</th> */}
                                                                    <th className='text-center'>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.sub_users.map((subdata, subIndex) => (
                                                                    <tr key={subIndex}>
                                                                        <td className='text-center'>{subdata.id}</td>
                                                                        <td>{subdata.name}</td>
                                                                        <td>{subdata.email}</td>
                                                                        <td>{subdata.company_name}</td>
                                                                        <td>{formatDate(subdata.register_id)}</td>
                                                                        {/* <td>{subdata.publisher_id}</td> */}
                                                                        <td className='text-center'>
                                                                            <button type="button" className={`tck_btn ${activeIndex === index ? "actv" : ""}`} onClick={() => handleToggle(index)}>
                                                                                <i className="fa fa-circle crcl" aria-hidden="true"></i>
                                                                                <i className="fa fa-circle crcl" aria-hidden="true"></i>
                                                                                <i className="fa fa-circle crcl" aria-hidden="true"></i>
                                                                            </button>
                                                                            {/* {activeIndex === index && renderSubMenu(data, index)} */}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                    </React.Fragment>
                                )) : 
                                <tr>
                                    <td colSpan="9">
                                        <Loader /> 
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {popup && <FromComponents 
                publshFrm={popup} 
                editData={editData}
                popTitle={formTitle} 
                clsPopup={closeModal}
                insrData={insertAPIData}
                cnfrmPop={confirmDelete}
                rlsPrmtnPop={rolesPopup}
                dltRowFun={deleteRow}
                cmsRlsData={cmsRolPrmtn}
            />}
        </Layout>
    );
}

export default Publishers;
