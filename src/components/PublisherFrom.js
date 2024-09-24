import React, {useState} from 'react'

function PublisherFrom(props) {
    const {edtData, dbFrmTtl, storData, drpLst } = props
    const [error, setError] = useState(false);
    const [dberror, setDBError] = useState(false);
    const [dbFrmData, setDBFrmData] = useState(false)
    const [vldtnError, setVldtnError] = useState(false);
    const [erorMsg, setErorMge] = useState({
        eroremal: 'Please Enter value',
        erorPswrd: 'Please Enter value'
    });   
    const [postData, setPostData] = useState({
        name:  edtData.name ? edtData.name : '',
        email: edtData.email ? edtData.email : '',
        company: edtData.company ? edtData.company :'',
        password: edtData.password? edtData.password : '' ,
        service_url: edtData.service_url ? edtData.service_url : '',
        cdnurl: edtData.cdnURL ? edtData.cdnURL : '',
        firebase_serverkey: edtData.firebase_serverkey ? edtData.firebase_serverkey : '',
        cdn_backend: edtData.cdn_backend ? edtData.cdn_backend : '',
        rols_prmstn: edtData ? edtData.roles[0].name : '',
    }); 
       
    const handleNext =()=>{ 
        console.log("sdsd", postData)
      postData.name === "" ||  postData.company === "" || postData.rols_prmstn === ""  ? setError(true) : edtData ?  setDBFrmData(true) : validate(postData)
    }

    const handleFnlSbmt = () =>{
        // console.log("postData", postData)
        storData(postData)    
    }  

    const backBtn = () =>{
        if(!dbFrmData){
            dbFrmTtl('DB Dependecny')
            setDBFrmData(true)
        }
        else{
            setDBFrmData(false)
            dbFrmTtl('Add New Publisher')
        }
    }
    
    const handleInptData =(event)=>{
        setPostData({...postData, [event.target.name] : event.target.value});
    }
       
    const validate =(values)=>{
        const errors = {};
        const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;;
        if(!values.email){
            setVldtnError(true)
            setError(false)
            setErorMge({
                eroremal: "Email is required!"
            })
        }else if(!regex.test(values.email)){
            setVldtnError(true)
            setError(false)
            setErorMge({
                eroremal: "This is not a valid email format"
            })
        }
        else if(!values.password){
            setVldtnError(true)
            setError(false)
            setErorMge({
                erorPswrd: "Password is required!"
            })
        } else if(values.password.length < 4){
            setVldtnError(true)
            setError(false)
            setErorMge({
                erorPswrd: "Password must be more than 4 characters"
            })
        } else if(values.password.length >16){
            setVldtnError(true)
            setErorMge({
                erorPswrd: "Password cannot be more than 16 characters"
            })
        }
        else{
            setError(false);
            setDBError(false);
            setDBFrmData(true);
        }
        return errors;
    }
   
    const newPblish = () =>{
        return (
            <div className='frm_wppr'>
                <fieldset>
                    <label>Name <em>*</em></label>
                    <input type="text" className="frm_txt" value={postData.name}  name='name' onChange={handleInptData} placeholder="Name" />
                    {error ? <p>{erorMsg.eroremal}</p> : ''}
                </fieldset>
                <fieldset>
                    <label>Email <em>*</em></label>
                    <input type="text" className="frm_txt emlInpt" value={postData.email} name='email' onChange={handleInptData} placeholder="Email"  disabled={edtData? true : false} />
                    {error || vldtnError ? <p>{erorMsg.eroremal}</p> : ''}
                </fieldset>
                <fieldset>
                    <label>Company name <em>*</em></label>
                    <input type="text" className="frm_txt" value={postData.company} name='company' onChange={handleInptData} placeholder="Company name" />
                    {error  ? <p>{erorMsg.eroremal}</p> : ''}
                </fieldset>  
                {
                    edtData ? ""
                    : 
                    <fieldset>
                        <label>Password <em>*</em></label>
                        <input type="password" className="frm_txt" value={postData.password} name='password' onChange={handleInptData} placeholder="Password" />
                        {error || vldtnError ? <p>{erorMsg.eroremal}</p> : ''}
                    </fieldset>
                }  
                
                <fieldset>   
                    <div className='rol_drp_dwn'>
                        <label>Roles Permission <em>*</em></label>
                        <select className="frm_txt" name='rols_prmstn' value={postData.rols_prmstn}   onChange={handleInptData} >                            
                            <option value="">--Select Roles--</option>                                           
                            {
                                !drpLst ? null :  drpLst.map((dataItem) =>
                                    <option value={dataItem.name} key={dataItem.id}>{dataItem.name}</option>
                                )
                            }
                        </select>
                        {error  ? <p>{erorMsg.eroremal}</p> : ''}
                    </div>        
                </fieldset>                             
                <div className='sbmt_wppr'>
                    <button type='buttom' onClick={handleNext}>Next</button>
                </div>
            </div> 
        )
    }

    

    const urlDpndcy = () =>{
        return (
            <div className='frm_wppr'>                           
                <fieldset>
                    <label>Service Url</label>
                    <input type="text" className="frm_txt" value={postData.service_url.toLowerCase()} name='service_url' onChange={handleInptData} placeholder="Service url" />
                    {dberror ? <p>Please Enter value</p> : ''}
                </fieldset>
                <fieldset>
                    <label>CDN Url</label>
                    <input type="text" className="frm_txt" value={postData.cdnurl.toLowerCase()} name='cdnurl' onChange={handleInptData} placeholder="CDN Url" />
                    {dberror ? <p>Please Enter value</p> : ''}
                </fieldset>
                <fieldset>
                    <label>Firebase Server key</label>
                    <input type="text" className="frm_txt" value={postData.firebase_serverkey.toLowerCase()} name='firebase_serverkey' onChange={handleInptData} placeholder="server key" />
                    {dberror ? <p>Please Enter value</p> : ''}
                </fieldset>
                <fieldset>
                    <label>CDN Backend</label>
                    <input type="text" className="frm_txt" value={postData.cdn_backend.toLowerCase()} name='cdn_backend'  onChange={handleInptData} placeholder="CDN Backend" />
                    {dberror ? <p>Please Enter value</p> : ''}
                </fieldset>
                <div className='sbmt_wppr'>
                    <button type='buttom' onClick={backBtn} className='mx-4'>Back</button>
                    <button type='buttom' onClick={handleFnlSbmt}>Save</button>
                </div>
            </div> 
        )
    }
    
  return (
    <>
        {
            !dbFrmData ?  
                newPblish()
            :                 
                urlDpndcy()
            
        }
    </>
  )
}

export default PublisherFrom
