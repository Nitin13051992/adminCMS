import React, { useState, useEffect } from 'react';
import Loader from './LoaderPage';

function RolesFrom({ data, edtRlsData, instVlu, edtValuData }) {
    const[error,setError] = useState(false);
    const [groupPermissions, setGroupPermissions] = useState(null);
    const [, setRolesData] = useState(null);
    const [allRolesChecked, ] = useState(false);
    const [selectedNames, setSelectedNames] = useState([]);
    const [edtData, setEdtData] = useState(edtRlsData.permissions)
    const [rlsPrmstn, setRlsPmstn] = useState({
        name: edtRlsData.name ? edtRlsData.name : '',
        permissions: []
    });

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setInputRef = (el) => {
        if (el && el.checked) {
            hdnlChckFun(el)
        }
    };
    const fetchData = async () => {
        try {
            const matches = await data.getAllAPIPage("roles", "GET");
            
            if (matches) {
                setGroupPermissions(matches.group_permissions);
                setRolesData(matches.role_list);
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

    const handleAllCheck = (event) => {
        const { checked } = event.target;
        const parent = event.target.closest('.title')?.nextElementSibling;
        
        if (!parent) {
            console.warn('Parent element or its next sibling not found.');
            return;
        }
    
        const children = parent.querySelectorAll(':scope > *');
        let updatedNames = edtData ? edtData.map((item) => item.name) : [...selectedNames];
    
        children.forEach(child => {
            const checkboxes = child.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = checked;
    
                if (checked) {
                    if (!updatedNames.includes(checkbox.name)) {
                        updatedNames.push(checkbox.name);
                    }
                } else {
                    updatedNames = updatedNames.filter(name => name !== checkbox.name);
                }
            });
        });
        const newSelection = [...new Set([...selectedNames, ...updatedNames])];
        setRlsPmstn({ ...rlsPrmstn, permissions: newSelection });
        setSelectedNames(newSelection);  
    };

    const handleRoleCheck = (event) => {
        const { name, checked } = event.target;
        const edtItemNames =  edtData ? edtData.map((item) => item.name) :  [...selectedNames, name];
        hdnlChckFun(event.target)
        if (checked) {
            const newSelection =  [...new Set([...selectedNames, ...edtItemNames, name])]; 
            setRlsPmstn({ ...rlsPrmstn, permissions: newSelection });
            setSelectedNames(newSelection);
        } else {
            const updatedSelection = selectedNames.filter(item => item !== name);
            setEdtData(edtData.filter(item => item.name !== name)); 
            setRlsPmstn({ ...rlsPrmstn, permissions: updatedSelection });
            setSelectedNames(updatedSelection);
        }
    };

    const allRoleCheck = (event) => {
        const {checked} = event.target;
        const cldName = document.querySelectorAll('.prmtn_wppr');
        const updatedNames = [...selectedNames];
        cldName.forEach(child => {
            const checkboxes = child.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = checked;
                if (checked) {                    
                    if (!updatedNames.includes(checkbox.name)) {                        
                        updatedNames.push(checkbox.name);
                    }
                } else {
                    const index = updatedNames.indexOf(checkbox.name);
                    if (index > -1) {
                        updatedNames.splice(index, 1);
                    }
                }
            });
        });
        setRlsPmstn({ ...rlsPrmstn, permissions: updatedNames});
        setSelectedNames(updatedNames);  
    };

    const handleInptData = (event) =>{
        setRlsPmstn({...rlsPrmstn, [event.target.name] : event.target.value });
    };

    const hdnlChckFun = (event) =>{
        const closestLi = event.closest('ul'),
        prntCls =  event.closest('.mdul_hdng_wppr');
        if (closestLi) {
            const checkboxes = closestLi.querySelectorAll('input[type="checkbox"]'),
            prntInptBx = prntCls.querySelectorAll('.fld_chck_bx')[0];
            const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
            prntInptBx.checked = allChecked
        }
    };
    
    const RlsSumt = () =>{
        if(rlsPrmstn.name === ''){
            setError(true)
        }
        else{
            edtData ? edtValuData(rlsPrmstn) : instVlu(rlsPrmstn)
        }

    };

    return (
        <div className='pblsh_lst_wppr crt_pop'>            
            <div className='nwRls_wppr'>
                <div className="title mb-3">
                    <h1>Assign Permission Roles</h1>
                </div>
                <div className='nwRls_frm'>
                    <fieldset>
                        <label> Create New Role Name<em>*</em></label>
                        <input 
                            type="text" 
                            value={rlsPrmstn.name} 
                            onChange={handleInptData} 
                            className="frm_txt" 
                            name='name' 
                            placeholder="Name" />
                        {error ? <p>Please Enter Rols Name</p> : ''}
                    </fieldset>
                    <button type='button' className='cmn_btn add_mr_btn' onClick={RlsSumt}> Submit </button>
                </div>
            </div>
            <div className="mdul_cntcnt_wppr">
                <div className="w-100 d-flex flex-wrap align-items-start justify-content-start">
                    <div className="title d-flex align-items-center">
                        <h2>All Roles Permission</h2>
                        <fieldset className='m-0'>
                            <input
                                type="checkbox"
                                name={`all`}
                                defaultChecked={allRolesChecked}
                                onChange={allRoleCheck}
                                className="fld_chck_bx"
                            />
                            <label></label>
                        </fieldset>
                    </div>
                </div>

                {groupPermissions ? (
                    <div className='prmtn_wppr'>
                        {Object.keys(groupPermissions).map((group, index) => (
                            <div className='mdul_cntcnt_row' key={index} >                            
                                <div className="mdul_hdng_wppr mb-4">                               
                                    <div className='title'>
                                        <h3>{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
                                        <div className="prc_wppr">
                                            <fieldset>
                                                <input
                                                    type="checkbox"
                                                    name={`checkbox-${index}`}
                                                    onChange={(event) => handleAllCheck(event)}
                                                    className="fld_chck_bx"
                                                    // checked={prntAllChkd}
                                                    defaultChecked={Object.keys(edtRlsData)[index] ===  group ? true : false}
                                                />
                                                <label></label>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className='add_mdl_wppr'>
                                        <ul>
                                            {groupPermissions[group].map(permission => (
                                                <li key={permission.id}>
                                                    <div className='txt_dtl_wppr' >
                                                        <small>{permission.name.replace(/-/g, ' ').replace(/_/g, ' ')}</small>
                                                        <fieldset>
                                                            <input
                                                                type="checkbox"
                                                                
                                                                defaultChecked={
                                                                    (edtData?.some(prm => prm.name === permission.name) || permission.checked )
                                                                }
                                                                onChange={(e) => handleRoleCheck(e,group, permission.name)}
                                                                name={permission.name}
                                                                className="fld_chck_bx sb_ctgry"
                                                                ref={(el) => setInputRef(el)}
                                                            />
                                                            <label></label>
                                                        </fieldset>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Loader />
                )}
                    {/* <h1 style={mystyle}> Loading Group Permissions...</h1> */}
            </div>
        </div>
    );
}

export default RolesFrom;
