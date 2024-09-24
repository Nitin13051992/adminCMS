/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

function Index(props) {
    const [searchValue, setSearchValue] = useState("");
    const [tabValue, setTabValue] = useState("");
    const [active, setActive] = useState("0");
    const [drpdwnTbl, setDrpDwnTbl] = useState(0);
    const [drpdwn, setDrpDwn] = useState("");
    const [cartStat, setCartStat] = useState(props.data[0].StatusData);
    const [clentTbale, setClientTable] = useState(props.data[0].ClintTable);
    const [firstName, setFirstName] = useState(clentTbale);
    const [srchdata, setSrchData] = useState(clentTbale);
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const mystyle = {
        color: "#868686",
        fontSize: "20px",
        fontWeight: '500',
        textAlign: "center",
    };
    useEffect(() => {
        const tabData = clentTbale.filter(status => status.status.includes(tabValue));
        setFirstName(tabData)   
        setSrchData(tabData)     
    }, [clentTbale, tabValue]);
    useEffect(() => {
        const result = srchdata.filter(({ clientName }) => clientName.toLowerCase().search(searchValue) !== -1);
        setFirstName(result) 
    }, [srchdata, searchValue]);
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };
    const AllData = (event) => {
        setFirstName(clentTbale)
        setActive(event.target.id);
        setSrchData(clentTbale)  
    }
    const TbngData = (event) => {
        setTabValue(event.target.textContent)
        setActive(event.target.id);
    }
    const TblDwnfun = (event) =>{
        if (event.target.className === "tck_btn actv_lst") {
            setDrpDwnTbl("")
        }
        else{
            setDrpDwnTbl(event.target.id)
        }
    }
    return (
        <main>
            <div className="cmn-txt-wppr">
                <div className="container">
                    <div className="row">
                        <div className="rcstr_sts_wppr">
                            <div className="title">
                                <h1>{props.data[0].AllHeading[0].hdngName}</h1>
                            </div>
                            <div className="sts_crt_wppr">
                                {
                                    cartStat.map((data, item) =>
                                        <div className="crt-3" key={data.id}>
                                            <div className="crt_icn">
                                                <span>
                                                    <img src={data.cart_icn} alt="" />
                                                </span>
                                            </div>
                                            <div className="crt_txt">
                                                <div className="title">
                                                    <h5>{data.Title}</h5>
                                                    <h2>{data.status_value} <small>{data.small_vlue}</small></h2>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="rcstr_sts_acdng_dtl">
                                <div className="acdng_btn_wppr">
                                    <ul>
                                        <li id='0' className={active === "0" ? "lnk_actv" : ""}  onClick={AllData}>All</li>
                                        <li id='1' className={active === "1" ? "lnk_actv" : ""} onClick={TbngData}>Active</li>
                                        <li id='2' className={active === "2" ? "lnk_actv" : ""} onClick={TbngData}>Completed</li>
                                        <li id='3' className={active === "3" ? "lnk_actv" : ""} onClick={TbngData}>Pending</li>
                                    </ul>
                                    <div className="acdng_fltr_wppr">
                                        <div className="srch_wppr">
                                            <button type="button" className="srch_icn">
                                                <img src="asset/images/index/search.svg" alt="" />
                                            </button>
                                            <input type="text" className="srch_txt" placeholder="Search" onChange={handleSearch} />
                                        </div>
                                        <div className="date_pckr_wppr">
                                            <div className="sctdata">
                                            <DatePicker
                                                selectsStart
                                                dateFormat="MM-dd-yyyy"  
                                                selected={startDate}
                                                onChange={date => setStartDate(date)}
                                                startDate={startDate}
                                            />
                                            <em>-</em>
                                            <DatePicker
                                                selectsEnd
                                                dateFormat="MM-dd-yyyy"  
                                                selected={endDate}
                                                onChange={date => setEndDate(date)}
                                                endDate={endDate}
                                                startDate={startDate}
                                                minDate={startDate}
                                                placeholder="mm-dd-yyyy"
                                            />
                                                {
                                                    //     <input type="text" id="startdate" name="from" placeholder="Select Date"  />
                                                    // <em>-</em>
                                                    // <input type="text" id="enddate" name="to" placeholder="End Date" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="acdng_tbl_data_wppr">
                                    <div className="acdng_tbl_data">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>CLIENT NAME</th>
                                                    <th>ASSIGNEE</th>
                                                    <th>NO OF RECASTER</th>
                                                    <th>DATE </th>
                                                    <th>STATUS</th>
                                                    <th>CHECK STATUS </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    firstName.length ? firstName.map((data, index) =>
                                                        <>
                                                            <tr key={data.id}  >
                                                                <td>{data.clientName}</td>
                                                                <td>{data.assignee}</td>
                                                                <td>{data.recasterNo}</td>
                                                                <td>{data.date}</td>
                                                                <td>
                                                                    <div className="tr_sts">
                                                                        <p className={data.status_cls}>{data.status}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button type="button" id={data.id} className={drpdwnTbl === data.id ? "tck_btn actv_lst" : "tck_btn"} onClick={TblDwnfun}>
                                                                        <i className="fa fa-circle" aria-hidden="true"></i>
                                                                        <i className="fa fa-circle" aria-hidden="true"></i>
                                                                        <i className="fa fa-circle" aria-hidden="true"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr index={index} id={data.id} className={drpdwnTbl === data.id ? "drp_dwn shw_dwn" : "drp_dwn"} >
                                                                <td colSpan="12" >
                                                                    <div className="trk_wppr">
                                                                        <div className="trk_data_lst">
                                                                            <div className="trk_hdng">
                                                                                <h4>{data.rqstTitle}</h4>
                                                                            </div>
                                                                            <div className="trck_lst_itm">
                                                                                <div className="trk_clm_2 trk_cmplt">
                                                                                    <div className="trck_icn">
                                                                                        <img src="asset/images/index/acptnc_icn.svg"
                                                                                            alt="" />
                                                                                    </div>
                                                                                    <div className="title">
                                                                                        <p>Request Acceptance</p>
                                                                                        <div className="trck_ckng">
                                                                                            <input type="checkbox"
                                                                                                className="trck_chck_txt" />
                                                                                            <label></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="trk_clm_2 trk_cmplt">
                                                                                    <div className="trck_icn">
                                                                                        <img src="asset/images/index/cnfgrtn_icn.svg"
                                                                                            alt="" />
                                                                                    </div>
                                                                                    <div className="title">
                                                                                        <p>System Configuration</p>
                                                                                        <div className="trck_ckng">
                                                                                            <input type="checkbox"
                                                                                                className="trck_chck_txt" />
                                                                                            <label></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="trk_clm_2">
                                                                                    <div className="trck_icn">
                                                                                        <img src="asset/images/index/sftwr_intltn_icon.svg"
                                                                                            alt="" />
                                                                                    </div>
                                                                                    <div className="title">
                                                                                        <p>Software installation</p>
                                                                                        <div className="trck_ckng">
                                                                                            <input type="checkbox"
                                                                                                className="trck_chck_txt" />
                                                                                            <label></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="trk_clm_2">
                                                                                    <div className="trck_icn">
                                                                                        <img src="asset/images/index/srvs_sts_icn.svg"
                                                                                            alt="" />
                                                                                    </div>
                                                                                    <div className="title">
                                                                                        <p>Connection Established</p>
                                                                                        <div className="trck_ckng">
                                                                                            <input type="checkbox"
                                                                                                className="trck_chck_txt" />
                                                                                            <label></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="trk_clm_2">
                                                                                    <div className="trck_icn">
                                                                                        <img src="asset/images/index/link_icn.svg"
                                                                                            alt="" />
                                                                                    </div>
                                                                                    <div className="title">
                                                                                        <p>Deploy</p>
                                                                                        <div className="trck_ckng">
                                                                                            <input type="checkbox"
                                                                                                className="trck_chck_txt" />
                                                                                            <label></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                        : <tr  > <td colSpan="12"> <h1 style={mystyle}> loading... </h1> </td></tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Index