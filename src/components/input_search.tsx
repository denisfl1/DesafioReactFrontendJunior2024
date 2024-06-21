import uncheck from "../images/unchecked.png"
import down_unclicked from "../images/down-gray.png"
import { useState } from "react"


const InputSearch = ()=>{

    const[search,setSeach] = useState()
    const [data,setData] = useState()

return(
    
    <div className="inputContainer_Master">
        <div className="inputContainer"><img className="down_unclicked" src={down_unclicked}></img><input placeholder="What needs to be done?"></input></div>
        <div className="container_search_select">
            <ul className="search_li">
                <li><img src={uncheck}></img>Learn State Machine</li>
                <li><img src={uncheck}></img>Use NX</li>
            </ul>
            <div className="container_status">   <span>1 item left</span>  <div className="container_select_option"> <div className="select_span"><span>All</span></div>  <div className="select_span selected"><span>Active</span></div>   <div className="select_span"><span>Completed</span></div></div> <span className="clear_completed">Clear Completed</span></div>
        </div>
    </div>
    

)


}
export default InputSearch