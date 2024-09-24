import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

function BitrateForm({data, addNewData}) {
  const [rglstn, setRglstn] = useState(false);
  const [, setSelectedClient] = useState('');
  const [, setRsltnData] = useState([]);
  const [selectedResolution, setSelectedResolution] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const [postData, setPostData] = useState({
    puserid: '',
    partnerid: '',
    tmpltname: '',
    v_qulty: '',
    vbr: '',
    abr: '',
    resolution: ''
  });
  const [error, setError] = useState(false);
  const rsltnApiData = {
    "4K (2160p)": [
      { id: 1, width: "3840", height: "2160", vprofile: 'high', vlevel:'5.1' },
      { id: 2, width: "2560", height: "1440", vprofile: 'high', vlevel:'5.1'  },
      { id: 3, width: "1920", height: "1080", vprofile: 'high', vlevel:'5.1'  },
      { id: 4, width: "1280", height: "720", vprofile: 'high', vlevel:'5.1'  },
      { id: 5, width: "584", height: "480", vprofile: 'main', vlevel:'4.1'  },
      { id: 6, width: "640", height: "360" , vprofile: 'main', vlevel:'4.1' },
      { id: 7, width: "426", height: "240" , vprofile: 'baseline', vlevel:'3.1' }
    ],
    "2K (1440p)": [
      { id: 1, width: "2560", height: "1440", vprofile: 'high',vlevel:'5.1' },
      { id: 2, width: "1920", height: "1080", vprofile: 'high',vlevel:'5.1' },
      { id: 3, width: "1280", height: "720", vprofile: 'high',vlevel:'5.1' },
      { id: 4, width: "584", height: "480", vprofile: 'main',vlevel:'4.1' },
      { id: 5, width: "640", height: "360", vprofile: 'main',vlevel:'4.1' },
      { id: 6, width: "426", height: "240", vprofile: 'baseline',vlevel:'3.1' }
    ],
    "FullHD (1080p)": [
      { id: 1, width: "1920", height: "1080", vprofile: 'high',vlevel:'5.1' },
      { id: 2, width: "1280", height: "720", vprofile: 'high' ,vlevel:'5.1'},
      { id: 3, width: "584", height: "480", vprofile: 'main',vlevel:'4.1' },
      { id: 4, width: "640", height: "360", vprofile: 'main',vlevel:'4.1' },
      { id: 5, width: "426", height: "240", vprofile: 'baseline',vlevel:'3.1' }
    ],
    "HD (720p)": [
      { id: 1, width: "1280", height: "720" , vprofile: 'high',vlevel:'5.1'},
      { id: 2, width: "854", height: "480" , vprofile: 'main',vlevel:'4.1'},
      { id: 3, width: "640", height: "360" , vprofile: 'main',vlevel:'4.1'},
      { id: 4, width: "426", height: "240", vprofile: 'baseline',vlevel:'3.1' }
    ],
    "SD (480p)": [
      { id: 1, width: "854", height: "480", vprofile: 'main',vlevel:'4.1' },
      { id: 2, width: "640", height: "360", vprofile: 'main',vlevel:'4.1' },
      { id: 3, width: "426", height: "240", vprofile: 'baseline',vlevel:'3.1' }
    ]
  };
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
    setError(false);
  };

  const handleNext = () => {
    if (!postData.partnerid) {
      setError(true);
    } else {
      addNewData(postData)
      // console.log("postData", postData);
    }
  };

  

  const handleQualityChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedResolution(selectedValue)
    setSelectedClient(selectedValue);
    setRglstn(selectedValue !== "Select");
    setRsltnData(rsltnApiData[selectedValue] || []);
    handleInputChange(event); 
  };

  

  const handleTmpltName =(event) =>{
    const index = event.target.selectedIndex;
    const el = event.target.childNodes[index]
    const option =  el.getAttribute('id');
    const selectedValue = event.target.value;  
    console.log("Sdsd",option, selectedValue)
    setPostData((prevData) => ({
      ...prevData,
      puserid: option,
      partnerid: selectedValue
    }));
  }

  const generateOptions = () => {
    if (!selectedResolution) return [];
      return rsltnApiData[selectedResolution].map((item) => ({
        label: `${item.width}X${item.height}`,
        value: `${item.width}x${item.height}, ${item.vprofile}, ${item.vlevel}`
      }));
    };
  const handleSelectChange = (selectedOptions) => {
  setSelectedOptions(selectedOptions);
  const selectedValuesArray = selectedOptions.map(option => {
    const [resolution, vprofile, vlevel] = option.value.split(', ');
    const [width, height] = resolution.split('x');
    return { width, height, vprofile, vlevel };      
  });
  setPostData(prevData => ({
    ...prevData,
    resolution: selectedValuesArray
  }));

  };
  return (
    <div className='frm_wppr'>
      <fieldset style={{ width: "33.3%" }}>
        <label>Client <em>*</em></label>
        <select 
          className="frm_txt" 
          name='partnerid' 
          value={postData.partnerid}   
          onChange={handleTmpltName}>
          <option value="Select">--Select--</option>
          {
            data.map((quality) => <option key={quality.id} id={quality.id} value={quality.publisherID}>{quality.name}</option> )
          }
        </select>
        {error && <p>Please enter a value</p>}
      </fieldset> 
      <fieldset style={{ width: "33.3%" }}>
        <label>Template Name<em>*</em></label>
        <input type="text" className="frm_txt" placeholder='Template Name' value={postData.tmpltname} name='tmpltname' onChange={handleInputChange}/>
      </fieldset>     
      <fieldset style={{ width: "33.3%" }}>
        <label>Video Quality <em>*</em></label>
        <select 
          className="frm_txt" 
          name='v_qulty'  
          onChange={handleQualityChange}
          value={selectedResolution}
          >
          <option value="Select">--Select Roles--</option>
          {Object.keys(rsltnApiData).map((quality) => (
            <option key={quality} value={quality}>{quality}</option>
          ))}
        </select>
        {error && <p>Please select a video quality</p>}
      </fieldset>
      {/* <fieldset style={{ width: "33.3%" }}> 
        <label>V Profile <em>*</em></label>
        <select 
          className="frm_txt" 
          name='v_prfl' 
          value={postData.v_prfl} 
          onChange={handleProfileChange}>
          {profileOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {error && <p>Please select a profile</p>}
      </fieldset>      
      <fieldset style={{ width: "33.3%" }}>
        <label>V Level <em>*</em></label>
        <input
          type="text"
          value={postData.v_lvl}
          className="frm_txt dsbl_fld"
          name='v_lvl'
          placeholder="Level"
          disabled
        />
      </fieldset>   */}
      <fieldset style={{ width: "33.3%" }}>
        <label>VBR<em>*</em></label>
        <input type="text" className="frm_txt" placeholder='video bitrate' value={postData.vbr} name='vbr' onChange={handleInputChange}/>
      </fieldset>
      <fieldset style={{ width: "33.3%" }}>
        <label>ABR <em>*</em></label>
        <select 
          className="frm_txt" 
          name='abr' 
          value={postData.abr} 
          onChange={handleInputChange}>
          <option value="">--Select abr--</option>
          {[128, 192, 320,].map((n) => (
            <option key={n} value={`${n}`}>{n}</option>
          ))}
        </select>
      </fieldset>
      {rglstn && (
        <fieldset style={{ width: "33.3%" }}>
        <label>Resolution <em>*</em></label>
        <MultiSelect
          options={generateOptions()}
          value={selectedOptions}
          onChange={handleSelectChange}
          labelledBy="Select" 
          hasSelectAll={false}
        />        
        {error && <p>Please enter a value</p>}
      </fieldset> 
      )}
      <div className='sbmt_wppr'>
        <button type='button' onClick={handleNext} className='mx-4'>Submit</button>
      </div>
    </div>
  );
}

export default BitrateForm;
