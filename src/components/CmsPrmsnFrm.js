import React, {useRef} from 'react'

function CmsPrmsnFrm({ drpLst, cmsRlsData}) {
    const slctRef = useRef(null)
    const RolsSlctFun =(e)=>{
        console.log("ele", slctRef.current.value)
    }
  return (
    <div className='rol_drp_dwn'>
        <div className='usr_prmtn mt-4'>
            <div className='usr_mmbr_wppr'>
                <small>User Edit</small>
                <h5>{cmsRlsData.email}</h5>
            </div>
            <div className='rol_drp_dwn'>
                <h6>Roles Permission</h6>
                <select className="frm_txt" ref={slctRef} >                            
                    <option value="">--Select Roles--</option>                                           
                    {
                        !drpLst ? null :  drpLst.map((dataItem) =>
                            <option value={dataItem.name} key={dataItem.id}>{dataItem.name}</option>
                        )
                    }
                </select>
            </div>
            <div className='sbmt_wppr' >
                <button type='buttom'  onClick={(e) => RolsSlctFun(e)}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default CmsPrmsnFrm
