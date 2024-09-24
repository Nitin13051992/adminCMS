/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout';
import PgNationData from '../components/PgNationData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import FromComponents from "../components/FromComponents";
import Loader from '../components/LoaderPage';

function ManagePermission({ data }) {
    const [publishersData, setPublishersData] = useState([]);
    const [popup, setPopUp] = useState(false);
    const [prmstFrm, setPrmstnFrm] = useState(false);
    const [fromTitle, setFromTitle] = useState('');
    const [method, setMethod] = useState('');
    const [edtID, setEdtID] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [prmtnEdtClckData, setPrmtnEdtClckData] = useState(null);
    const [shwEdtFrm, setShwEdtFrm] = useState(false);
    

    useEffect(() => {
        document.querySelectorAll(".dshbrd_wppr")[0].classList.add('overflow-hidden');
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (insrtData = null, prmstnEdtID = null, edtData = null, SlctDltId = null) => {
        try {
            const matches = await data.getAllAPIPage("permissions", 'GET', insrtData, prmstnEdtID, edtData, SlctDltId);
            if (matches.permission_list) {
                setPublishersData(matches.permission_list);
            }
        } catch (error) {
            handleFetchError(error);
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
        setFromTitle("New Permissions");
        setPopUp(isOpen);
        setConfirmDelete(false);
        setPrmstnFrm(true);
        setPrmtnEdtClckData('')
        setMethod('POST');
    };

    const closeModal = (isOpen) => {
        setPopUp(isOpen);
    };

    const EdtDataFun = async (indxID) => {
        const prmstnEdtID = publishersData[indxID].id;
        try {
            const matches = await data.getAllAPIPage("permissions", 'GET', null, prmstnEdtID);
            setFromTitle("Edit Permissions Form");
            setPrmtnEdtClckData(matches);
            setConfirmDelete(false);
            setEdtID(prmstnEdtID);
            setPrmstnFrm(true)
            setPopUp(true);
            setMethod('PUT');
        } catch (error) {
            console.error("error massage", error);
        }
    };

    const EdtFromData = async (edtData) => {
        try {
            await data.getAllAPIPage("permissions", method, null, edtID, edtData);
            setPopUp(false);
            fetchData("permissions", 'GET');
        } catch (error) {
            console.error("error", error);
        }
    };

    const CnfrmDltPop = (indxID) => {
        setPopUp(true);
        setMethod('DELETE');
        setPrmstnFrm(false);
        setConfirmDelete(true);
        setEdtID(publishersData[indxID].id);
        setFromTitle("Are you sure you want to delete");
    };

    const dltRowData = async () => {
        try {
            await data.getAllAPIPage("permissions", method, null, null, null, edtID);
            setPopUp(false);
            fetchData("permissions", 'GET');
        } catch (error) {
            console.error("error massage", error);
        }
    };

    const insrtNwFun = async (insrtData) => {
        try {
            await data.getAllAPIPage("permissions", 'POST', insrtData);
            setPopUp(false);
            fetchData("permissions",'GET');
        } catch (error) {
            console.error("error massage", error);
        }
    };

    return (
        <Layout>
            <div className='pblsh_lst_wppr'>
                <div className="title d-flex align-items-center flex-wrap">
                    <h1>Permissions</h1>
                    <button type='button' className='cmn_btn add_mr_btn' onClick={() => PopUpFun(true)}>+</button>
                    <p className='w-100 mt-2'>Manage your permissions here.</p>
                </div>
                {Object.keys(publishersData).length > 0 && <PgNationData fltrData={publishersData} />}
                <div className='pblsh_lst_tbl_wppr'>
                    <table>
                        <thead>
                            <tr>
                                <th className='text-center'>ID</th>
                                <th>Name</th>
                                <th>Group</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(publishersData).length > 0 ? publishersData.map((data, index) => {
                                const { id, name, group_name, mstatus } = data;
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>{id}</td>
                                        <td>{name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ').replace(/_/g, ' ')}</td>
                                        <td>{group_name}</td>
                                        <td className={`${mstatus === "1" ? "Active" : 'Pending'} text-center px-4`}>
                                            {mstatus === "1" ? "Active" : 'Pending'}
                                        </td>
                                        <td>
                                            <div className='act_btn_wppr text-center'>
                                                <Link to={''} onClick={() => EdtDataFun(index)}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Link>
                                                <Link to={''} onClick={() => CnfrmDltPop(index)}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="5">
                                        <Loader />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {popup && (
                <FromComponents
                    popTitle={fromTitle}
                    clsPopup={closeModal}
                    prmstnFrm={prmstFrm}
                    insrtDataFrm={insrtNwFun}
                    dltRowFun={dltRowData}
                    cnfrmPop={confirmDelete}
                    prmstnEdtData={prmtnEdtClckData}
                    edtPrmtnData={EdtFromData}
                    openshwEdtFrm={shwEdtFrm}
                />
            )}
        </Layout>
    );
}

export default ManagePermission;
