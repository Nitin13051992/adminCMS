import React, { useState, useEffect } from 'react'
import RolesFrom from './RolesFrom';
import PrmstnFrm from './PrmstnFrm';
import MatchAPI from "../ApiData/matchAPI";
import PublisherFrom from './PublisherFrom';
import BitrateFrom from './BitrateFrom'

const FromComponents = (props) => {
    const {publshFrm, insrData ,popTitle, pblshedtData, clsPopup, editData, cnfrmPop, dltRowFun, rlsPrmtnPop, prmstnFrm, insrtDataFrm, rlsEdtData, prmstnEdtData, edtPrmtnData, openshwEdtFrm, rlsPrmstnData, rlsInsrtVlu, bitratFrm, bitrtAPIData} = props
    const [, setDBTitle] = useState(popTitle);
    const [rolsData, setRolsData] = useState(null);
    useEffect(() => {
        document.querySelectorAll(".dshbrd_wppr")[0].classList.add('overflow-hidden');        
        // console.log("cnfrmPop", cnfrmPop)
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const matches = await MatchAPI.getAllAPIPage("roles", "GET");
            if (matches) {
                const rolsPrmstn = matches.role_list
                setRolsData(rolsPrmstn)    
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
    const dbFubctn = (event) =>{
        setDBTitle(event)
    }
   
  return (
    <>
        <div className='frm_pop_wppr' onClick={(e) => {e.stopPropagation(); clsPopup(false)}}>
            <div className={cnfrmPop || bitratFrm ? 'frm_pop' : "frm_pop w-auto" } onClick={(e) => {e.stopPropagation(); clsPopup(true)}}>
                <button type='type' className='pop_cld' onClick={(e) => {e.stopPropagation(); clsPopup(false)}}></button>
                {
                    rlsPrmtnPop ? 
                        <RolesFrom data={MatchAPI} edtRlsData={rlsPrmstnData} instVlu={rlsInsrtVlu} edtValuData={rlsEdtData} />
                    :    
                    <div className='frm_bx_wppr'>
                        <div className='title'>
                            <h2>{popTitle}</h2>
                        </div>
                        {
                            prmstnFrm ? 
                                <PrmstnFrm data={MatchAPI} edtCntnct={edtPrmtnData}  addNewData={insrtDataFrm} edtPrmstn={prmstnEdtData} prmtnEdtFrmOpn={openshwEdtFrm}  />
                            :
                            cnfrmPop ? 
                                <div className='frm_wppr'>
                                    <div className='sbmt_wppr justify-content-center' >
                                        <button type='buttom'  onClick={(e) => {e.stopPropagation(); dltRowFun(true)}} className='w-auto px-4'>Confirm</button>
                                    </div>
                                </div>   
                            :                     
                            publshFrm ?
                                <PublisherFrom drpLst={rolsData} edtVlu={pblshedtData} dbFrmTtl={dbFubctn} storData={insrData} edtData={editData} />
                            :
                            bitratFrm ? 
                                <BitrateFrom data={bitrtAPIData} addNewData={insrtDataFrm}  />
                            :
                           
                                ''          
                        }
                    </div>
                }
            </div>
        </div>
    </>
  )
}

export default FromComponents
