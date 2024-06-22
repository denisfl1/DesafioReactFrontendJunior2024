import uncheck from "../images/unchecked.png"
import check from "../images/checked.png"
import down_unclicked from "../images/down-gray.png"
import { useState } from "react"


interface object_Data{
    id:string,
    title:string,
    isDone:boolean,
    map:(data:any)=>object_Data
}

const InputSearch = ()=>{

    const[search,setSeach] = useState()
    const [data,setData] = useState<any>(

        [
            {
              id: "flrGI",
              title: "Lavar os pratos",
              isDone: false
            },
            {
              id:"Tw-I9",
              title: "Cortar a grama",
              isDone: true
            },
            {
              id: "7f2sf",
              title: "Comprar pão",
              isDone: false
            }
          ]

    )

    const HandleCheck=(id:string,parameter:boolean)=>{
        console.log(data)
        if(parameter == true)return setData((it:object_Data)=>{
            it.map((val:object_Data)=>{
               return val.id == id && {...val,isDone:true}
            })
        })
        return setData((it:object_Data)=>{
            it.map((val:object_Data)=>{
               return val.id == id && {...val,isDone:false}
            })
        })

    }

return(
    
    <div className="inputContainer_Master">
        <div className="inputContainer"><img className="down_unclicked" src={down_unclicked}></img><input placeholder="What needs to be done?"></input></div>
        <div className="container_search_select">
           {data[0] && <ul className="search_li">
                {data.map((items:object_Data)=>{
                    return(
                        <>
                         <li><img onClick={()=>HandleCheck(items.id,items.isDone)} src={items.isDone ? check : uncheck}></img>{items.title}</li>                   
                        </>
                    )
                })}
            </ul>}
            <div className="container_status">   <span style={{marginLeft:'-20px'}}>{`${1} item left`}</span>  <div className="container_select_option"> <div className="select_span"><span>All</span></div>  <div className="select_span selected"><span>Active</span></div>   <div className="select_span"><span>Completed</span></div></div> <span className="clear_completed">Clear Completed</span></div>
        </div>
    </div>
    

)


}
export default InputSearch