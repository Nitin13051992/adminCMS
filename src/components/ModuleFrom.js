import React, {useState} from 'react'
const ModuleFrom = ({clsFrom,editData, sbmtDat, dltPop, dltRowData, edtfrom, edtVlueData, frmHdng}) => {
    const [error, setError] = useState('');
    const [dltMsg] = useState(dltPop)
    const [postData, setPostData] = useState({
        module_name: edtfrom ? edtVlueData.module_name : '',
        tag: edtfrom ? edtVlueData.tag : ''
    });
    const handleInput = (event) =>{
        setPostData({...postData, [event.target.name] : event.target.value});             
    }
    const fromSbmtDat = () =>{
        if(postData.module_name === '' || postData.tag === ''){
            setError(true)       
        }
        else{
            edtfrom ? editData(postData) : sbmtDat(postData)
        }
    }
  return (
    <>
        <div className='frm_pop_wppr' onClick={(e) => {e.stopPropagation(); clsFrom(false)}}>
            <div className={dltMsg ? "frm_pop" : "frm_pop w-auto" } onClick={(e) => {e.stopPropagation(); clsFrom(true)}}>
                <button type='type' className='pop_cld' onClick={(e) => {e.stopPropagation(); clsFrom(false)}}></button>                
                <div className='frm_bx_wppr'>
                    <div className='title'>
                        <h2>{frmHdng}</h2>
                    </div>
                    {
                    dltMsg ?
                        <div className='frm_wppr'>
                            <fieldset>
                                <label>Module Name:<em>*</em> </label>
                                <input type="text" value={postData.module_name} onChange={handleInput} className="frm_txt" name='module_name' placeholder="Name" />
                                {error ? <p>Please Enter value</p> : ''}
                            </fieldset>
                            <fieldset>
                                <label>ModuleTag:<em>*</em> </label>
                                <input type="text" value={postData.tag} onChange={handleInput} className="frm_txt" name='tag' placeholder="Tag" />
                                {error ? <p>Please Enter value</p> : ''}
                            </fieldset>
                            <div className='sbmt_wppr' >
                                <button type='buttom' onClick={fromSbmtDat}>Save </button>
                            </div>
                        </div>
                    : 
                        <div className='frm_wppr'>
                            <div className='sbmt_wppr justify-content-center' >
                                <button type='buttom'  onClick={(e) => {e.stopPropagation(); dltRowData(false)}} className='w-25'>Confirm</button>
                            </div>
                        </div>
                    }
                </div> 
            </div>
        </div>
    </>
  )
}

export default ModuleFrom
