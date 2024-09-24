import React, { useState } from 'react';

function PrmstnFrm(props) {
  const { addNewData, prmtnEdtFrmOpn, edtPrmstn, } = props;
  const [postData, setPostData] = useState({
    name: edtPrmstn.name ? edtPrmstn.name : '',
    group_name: edtPrmstn.group_name ? edtPrmstn.group_name : ''
  });
  const [error, setError] = useState(false);

  const erorMsg = {
    eroremal: 'Please enter a value',
    erorPswrd: 'Please enter a value'
  };

  const handleInptData = (event) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
    setError(false); 
  };

  const handleNext = () => {
    if (postData.name === "" || postData.group_name === "") {
      setError(true);
    } else {
      prmtnEdtFrmOpn ? edtPrmstn(postData) : addNewData(postData);
    }
  };

  return (
    <div className='frm_wppr'>
      <fieldset className='w-50'>
        <label>Permissions Name <em>*</em></label>
        <input
          type="text"
          value={postData.name}
          className="frm_txt"
          name='name'
          placeholder="Name"
          onChange={handleInptData}
        />
        {error && <p>{erorMsg.eroremal}</p>}
      </fieldset>
      <fieldset className='w-50'>
        <label>Group Name <em>*</em></label>
        <input
          type="text"
          value={postData.group_name}
          className="frm_txt"
          name='group_name'
          placeholder="Group Name"
          onChange={handleInptData}
        />
        {error && <p>{erorMsg.eroremal}</p>}
      </fieldset>
      <div className='sbmt_wppr'>
        <button type='button' onClick={handleNext} className='mx-4'>Submit</button>
      </div>
    </div>
  );
}

export default PrmstnFrm;
