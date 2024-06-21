import React from "react"





const InputSearch = ()=>{

return(
    
    <div>
        <div className="inputContainer"><input placeholder="What needs to be done?"></input></div>
        <div>
            <ul className="search_li">
                <li><img></img>Learn State Machine</li>
                <li>Use NX</li>
            </ul>
            <div className="container_status">   <span>1 item left</span>  <div className="container_select_option"> <span>All</span>  <span>Active</span>   <span>Completed</span></div> <span>Clear Completed</span></div>
        </div>
    </div>
    

)


}
export default InputSearch