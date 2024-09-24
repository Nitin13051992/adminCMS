import React,{useState, useEffect} from 'react'

function PgNationData({fltrData, srchDataPrp}) {  
  const [filtrdata] = useState(fltrData); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue] = useState();
  const recordsPrePage = 25;
  const lastIndex = currentPage * recordsPrePage;
  const firstIndex = lastIndex - recordsPrePage;
  const npage = Math.ceil(filtrdata.length / recordsPrePage);
  const number = [...Array(npage + 1).keys()].slice(1);
  useEffect(() => {
    // srchDataPrp(searchValue)
  }, [searchValue, firstIndex, lastIndex]);

  const ChnageCPage = (id) => {
    setCurrentPage(id)
  };
  const PrePage = (e) => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  };
  const NxtPage = (e) => {
    if (currentPage !== npage) {
        setCurrentPage(currentPage + 1)
    }
  };
  const HandleSearch = (event) => {
    srchDataPrp(event.target.value)
  };
  return (
    <div className='pg_fltr_wppr'>
      <div className='pgnatn_wppr'>
          <div className='title'>
              <p>{`Show ing- ${currentPage} to ${recordsPrePage} Of ${filtrdata.length}`}</p>
          </div>
          <div className='pagination'>
              <ul>
                  <li className='btn_cmn' onClick={PrePage}></li>
                  {
                      number.map((n, i) => {
                          return (
                              <li className={`${currentPage === n ? 'active' : ''}`} onClick={() => ChnageCPage(n)} key={i}>{n}</li>
                          )
                      })
                  }
                  <li className='btn_cmn' onClick={NxtPage}></li>
              </ul>
          </div>
      </div>
      <div className='tbl_srch_wppr'>
          <div className="srch_wppr">
              <button type="button" className="srch_icn">
                  <img src="asset/images/index/search.svg" alt="" />
              </button>
              <input type="text" className="srch_txt" placeholder="Search" onChange={HandleSearch} />
          </div>
      </div>
  </div>
  )
}

export default PgNationData
