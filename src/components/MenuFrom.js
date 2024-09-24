import React, { useState } from 'react'

const MenuForm = ({clsPopup,catgryData, insrtData,edtFromOpn, editData, edtfrmVlu, cnfrmPop, dltRow, popTitle}) => {
    const[error,setError] = useState(false);
    const [ctrgryId, setCtgryID ] = useState({
        value: edtFromOpn ? catgryData.mid : ''
    });
    const[postData, setPostData] = useState({
        mname: edtFromOpn ? edtfrmVlu.mname : '',
        icon_class: edtFromOpn ? edtfrmVlu.icon_class : '',
    });
    const handleInptData = (event) =>{
        setPostData({...postData, [event.target.name] : event.target.value });
    }
    const handleCtgryData = (event) =>{
        setCtgryID({...ctrgryId, [event.target.name] : event.target.value})
    }
    const SbmtFrmData =() =>{
        if(postData.mname === '' || postData.icon_class === '' || postData.value === ''){
            setError(true)
        }
        else{
            edtFromOpn ? editData(postData) : insrtData(postData, ctrgryId)
        }
    }
  return (
    <>
        <div className='frm_pop_wppr' onClick={(e) => {e.stopPropagation(); clsPopup(false)}}>
            <div className={cnfrmPop ? "frm_pop" : "frm_pop w-auto" } onClick={(e) => {e.stopPropagation(); clsPopup(true)}}>
                <button type='type' className='pop_cld' onClick={(e) => {e.stopPropagation(); clsPopup(false)}}></button>
                <div className='frm_bx_wppr'>
                    <div className='title'>
                        <h2>{popTitle}</h2>
                    </div>
                    {
                        cnfrmPop ? <div className='frm_wppr'>
                            <fieldset>
                                <label>Menu Name: <em>*</em> </label>
                                <input 
                                type="text" 
                                value={postData.mname} 
                                onChange={handleInptData} 
                                className="frm_txt" 
                                name='mname' 
                                placeholder="Name" />
                                {error ? <p>Please Enter value</p> : ''}
                            </fieldset>
                            <fieldset>
                                <label>Menu Icon Class: <em>*</em></label>
                                <input type="text" value={postData.icon_class} onChange={handleInptData}  className="frm_txt" name='icon_class' placeholder="Icon" />
                                {error ? <p>Please Enter value</p> : ''}
                            </fieldset>
                            <fieldset>
                                <label>Menu Category: <em>*</em></label>
                                <select className="frm_txt" name='value' onChange={handleCtgryData} value={ctrgryId.value}  data-live-serach={true}>
                                    <option value="">--Select Menu--</option>
                                    {
                                        catgryData.map((ctgrydata, index) =>{
                                            return(
                                                <option key={index} value={ctgrydata.mid}>{ctgrydata.mname}</option>
                                            )
                                        })
                                    }
                                </select>
                                {error ? <p>Please Enter value</p> : ''}
                            </fieldset>
                            <fieldset>
                                <label></label>
                                <div className='sbmt_wppr w-100 p-0 mb-3'>
                                    <button type='buttom' onClick={SbmtFrmData} className='w-100'>Save </button>
                                </div>
                            </fieldset>                        
                        </div>
                        : 
                        <div className='frm_wppr'>
                            <div className='sbmt_wppr justify-content-center' >
                                <button type='buttom'  onClick={(e) => {e.stopPropagation(); dltRow(true)}} className='w-auto px-4'>Confirm</button>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default MenuForm
