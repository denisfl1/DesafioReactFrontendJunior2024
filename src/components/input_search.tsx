import uncheck from "../images/unchecked.png"
import check from "../images/checked.png"
import down_unclicked from "../images/down-gray.png"
import { useEffect, useState } from "react"



const InputSearch = ()=>{

    interface object_Data{
        id:string,
        title:string,
        isDone:boolean,
        map:(data:any)=>void
    }
    
    let test:any = []

    const[search,setSeach] = useState()
    const [data,setData] = useState<any>([])

    const mydata = [
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

    useEffect(()=>{

        setData(mydata)

    },[])


    const HandleCheck=(id:string)=>{

        setData((prev:object_Data)=>
            prev.map((it:object_Data)=>
                it.id == id ? {...it,isDone:!it.isDone}:it
            )
        )

    }




return(
    
    <div className="inputContainer_Master">
        <div className="inputContainer"><img className="down_unclicked" src={down_unclicked}></img><input placeholder="What needs to be done?"></input></div>
        <div className="container_search_select">
           <ul className="search_li">
                {data.map((items:object_Data,index:number)=>{
                    !items.isDone && test.push(items.isDone)
                    return(
                        <>
                         <li className={`${items.id, items.isDone && 'isDone'}`}><img onClick={()=>HandleCheck(items.id,index)} src={items.isDone ? check : uncheck}></img>{items.title}</li>                   
                        </>
                    )
                })}
            </ul>
            <div className="container_status">   <span style={{marginLeft:'-20px'}}>{`${test.length} item left`}</span>  <div className="container_select_option"> <div className="select_span"><span>All</span></div>  <div className="select_span selected"><span>Active</span></div>   <div className="select_span"><span>Completed</span></div></div> <span className="clear_completed">Clear Completed</span></div>
        </div>
    </div>
    

)


}
export default InputSearch