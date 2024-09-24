import React, { useState, useEffect, useRef  } from 'react'
import Layout from '../components/Layout';
import Loader from '../components/LoaderPage';

function Permission({data}) {
    const inputRef = useRef(null);
    const [groupPermissions, setGroupPermissions] = useState(null);
    const [rolsData, setRolsData] = useState(null);
    useEffect(() => {
        document.querySelectorAll(".dshbrd_wppr")[0].classList.add('overflow-hidden');        
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchData = async () => {
        try {
            const matches = await data.getAllAPIPage("roles", "GET");
            if (matches) {
                const grpPrmstn = matches.group_permissions;
                const rolsPrmstn = matches.role_list
                setGroupPermissions(grpPrmstn)   
                setRolsData(rolsPrmstn)    
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
    const handleAllCheck =  (event) => {
        const formData = event,
            prntSlct = formData.target,
            sblngDiv = prntSlct.offsetParent.offsetParent.nextElementSibling,
            chldrnLngth = sblngDiv.children[0].children;
        for(var i = 0; i < chldrnLngth.length; i++ ){
            const sbllngLstNo = chldrnLngth[i].children[0].childNodes[1]           
            if(!formData.currentTarget.checked){
                sbllngLstNo.children[0].checked = false
            }
            else{
                if(!sbllngLstNo.children[0].checked){
                    sbllngLstNo.children[0].checked = true 
                }
            }
        }
    };
    const handlePrsnCheck = (event) =>{
        const formData = event,
            prntSlct = formData.target,
            sblngDiv = prntSlct.offsetParent.offsetParent.offsetParent,
            chldrnLngth = sblngDiv.children;   
            console.log(prntSlct.checked);        
        for(var i = 0; i < chldrnLngth.length; i++ ){
            const sbllngLstNo = chldrnLngth[i].childNodes[0].childNodes[1],
                chldVluStat =  sbllngLstNo.children[0].checked,    
                prntCtgryData = sblngDiv.offsetParent.children[0].childNodes[1].childNodes[0];
            console.log("chldVluStat", chldVluStat)
            if(!chldVluStat === true){
                prntCtgryData.children[0].checked = false
                
            }
            else{                
                prntCtgryData.children[0].checked = true
            }
        }
    }
    const allRoleCheck = (event) =>{
        var lenthBox = document.querySelectorAll('.fld_chck_bx')
        for (let index = 1; index < lenthBox.length; index++) {
            const element = lenthBox[index];
            !event.currentTarget.checked ? element.checked = false : element.checked = true
        }        
    }
  return (
    <Layout>
        <div className='pblsh_lst_wppr'>
            <div className="title d-flex align-items-center justify-content-between">
                <h1>Assign Permission Roles</h1>
                <div className='usr_prmtn'>
                    <div className='usr_mmbr_wppr'>
                        <small>User Edit</small>
                        <h5>demo@test.com</h5>
                    </div>
                    <div className='rol_drp_dwn'>
                        <h6>Roles Permission</h6>
                        <select className="frm_txt">                            
                            <option value="">--Select Roles--</option>
                            {
                                !rolsData ? null :  rolsData.map((dataItem) =>
                                    <option value={dataItem.name} key={dataItem.id}>{dataItem.name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
            </div> 
            <div className="mdul_cntcnt_wppr">
                <div className="w-100 d-flex flex-wrap align-items-start justify-content-start">
                    <div className="title d-flex align-items-center">
                        <h2>All Roles Permission</h2>
                        <fieldset className='m-0'>
                            <input  type="checkbox"  name={`all`} onChange={(e) => allRoleCheck(e)} className="fld_chck_bx" />
                            <label></label>
                        </fieldset>
                    </div>
                </div>
                {groupPermissions ? (                    
                    <div className='prmtn_wppr'>
                    {Object.keys(groupPermissions).map((group, index) => {
                        return(
                            <>                            
                                <div className="mdul_cntcnt_row " key={index}>
                                    <div className="mdul_hdng_wppr mb-4">
                                        <div className='title'>
                                            <h3>{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
                                            <div className="prc_wppr">
                                                <fieldset>
                                                    <input  type="checkbox"  name={`checkbox-${index}`} onChange={(e) => handleAllCheck(e)} className="fld_chck_bx" />
                                                    <label></label>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className='add_mdl_wppr'>
                                            <ul>
                                            {groupPermissions[group].map(permission => (
                                                <li key={permission.id}>
                                                    <div className='txt_dtl_wppr'>
                                                        <small>{permission.name.replace(/-/g, ' ').replace(/_/g, ' ')}</small>
                                                        <fieldset>
                                                            <input ref={inputRef} type="checkbox"  onChange={(e) => handlePrsnCheck(e)}  name={`checkbox-${index}`}
                                                            className="fld_chck_bx sb_ctgry" />
                                                            <label></label>
                                                        </fieldset>
                                                    </div>
                                                </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                )
                : (<Loader />)
                }
            </div>
                {/* : (<h1 style={mystyle}> Loading Group Permissions...</h1>) */}
        </div>
    </Layout>
  )
}

export default Permission
