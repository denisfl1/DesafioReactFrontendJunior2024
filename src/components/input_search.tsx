import uncheck from "../images/unchecked.png"
import check from "../images/checked.png"
import clear from "../images/close.png"
import down_unclicked from "../images/down-gray.png"
import { useCallback, useEffect, useState } from "react"



const InputSearch = ()=>{

    interface Data_types{
        id:string,
        title:string,
        isDone:boolean,
        map:(data:any)=>void,
        filter:(data:any)=>void
    }
    
    let items_left:boolean[] = []

    const[inputText,setInputText] = useState('')
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


    const HandleChange=(type:string,id:string,parameter:boolean)=>{

        if(type == 'done_undone'){

        setData((prev:Data_types)=>
            prev.map((it:Data_types)=>
                it.id == id ? {...it,isDone:parameter}:it
            )
        )
        }

        if(type == 'remove'){

         setData((prev:Data_types)=>
            prev.filter((it:Data_types)=>
                {return it.id != id}
            )
        )   

        }

    }

    const AddList=useCallback(()=>{

        let randomId = Math.random().toString(36).substring(2,9)
        
       for(const i in data){

        if(data[i]['title'].toLowerCase() === inputText.toLowerCase())return alert("Tarefa já existe!")

        while(data[i]['id'] ==  randomId){
            randomId = randomId

        }
        
       }

       const newData = {id:randomId,title:inputText,isDone:false}

       setData((prev:Data_types[])=>[newData,...prev])
            


    },[inputText,data])


return(
    
    <div className="inputContainer_Master">
        <div className="inputContainer"><img className="down_unclicked" src={down_unclicked}></img><input onKeyDown={e=>e.key == "Enter" &&  AddList()} onChange={(e:any)=>setInputText(e.target.value)} placeholder="What needs to be done?"></input></div>
        <div className="container_search_select">
           <ul className="search_li">
                {data.map((items:any)=>{
                    !items.isDone && items_left.push(items.isDone)
     
                
                    return(
                        <>
                         <li className={`${items.id, items.isDone && 'isDone'}`}><img className="done_undone" onClick={()=>HandleChange('done_undone',items.id,!items.isDone)} src={items.isDone ? check : uncheck}></img>{items.title}<img onClick={()=>HandleChange('remove',items.id,false)} className="clear" src={clear}></img></li>                   
                        </>
                    )
                })}
            </ul>
            <div className="container_status">   <span style={{marginLeft:'-20px'}}>{`${items_left.length} item${items_left.length >1 || items_left.length == 0 ?'s' : ''} left`}</span>  <div className="container_select_option"> <div className="select_span"><span>All</span></div>  <div className="select_span selected"><span>Active</span></div>   <div className="select_span"><span>Completed</span></div></div> <span className="clear_completed">Clear Completed</span></div>
        </div>
    </div>
    

)


}
export default InputSearch