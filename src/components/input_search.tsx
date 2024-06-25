import uncheck from "../images/unchecked.png"
import check from "../images/checked.png"
import clear from "../images/close.png"
import down_unclicked from "../images/down-gray.png"
import down_active from "../images/down-black.png"
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
    let items_done:string[] = []
    
    const [inputText,setInputText] = useState('')
    const [data,setData] = useState<any>([])
    const [count,setCount] = useState<number>(items_done.length)
    const [search_li_open,setSearch_li_open] = useState(false)
    const [filter,setFilter] = useState<string|boolean>('all')
    const [borderClass,setBorderClass]= useState<string>('all')
    const [edit,setEdit]= useState({state:false,id:''})


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

      const filtered = filter != 'all' ? data.filter((its:Data_types)=>{
        return its.isDone == filter 
     }):data

    useEffect(()=>{
    
    setCount(items_done.length)
       

    },[items_done])

   

    useEffect(()=>{

      setData(mydata)

    },[])


    const HandleChange=(type:string,id:string|string[],parameter:boolean|null)=>{

        if(type == 'done_undone'){

        setData((prev:Data_types)=>
            prev.map((it:Data_types)=>
                it.id == id ? {...it,isDone:parameter}:it
            )
        )
        }

        if(type == 'remove'){
  
        setData((prev:Data_types)=> prev.filter((it:Data_types)=>{return it.id != id}))   
    
        }

    }

    const AddList=useCallback(()=>{

        if(inputText === '')return

        let randomId = Math.random().toString(36).substring(2, 9)
        
       if(!edit.state){
       for(const i in data){

        if(!edit.state && data[i]['title'].toLowerCase() === inputText.toLowerCase())return alert("Tarefa já existe!")
        
       }

       while (data.some((item:Data_types)=>item.id === randomId)) {
        randomId = Math.random().toString(36).substring(2, 9)
       }
       
       setData((prev:Data_types[])=>[{id:randomId,title:inputText,isDone:false},...prev])

        }else{
            setData((prev:Data_types[])=>prev.map(its=>its.id == edit.id ?{...its,title:inputText}:its))
            edit.state = false
            edit.id = ''
        }

       setSearch_li_open(true)

    

    },[inputText,data])

    const showSearch=()=>{
    

        if(data.length>0){
        setSearch_li_open(true)   
        setData((prev:Data_types)=>
            prev.map((it:Data_types)=>
                it?{...it,isDone:true}:it
            )
        )

        }
        if(count>1){
            setData((prev:Data_types)=>
                prev.map((it:Data_types)=>
                    it?{...it,isDone:false}:it
                )
            )
        }

        
    }

    const handleRemove=()=>{

        items_done.forEach((ids:string)=>{
            
            setData((prev:Data_types)=>
                prev.filter((it:Data_types)=>
                    {return it.id != ids}
                )
            )   

        })    

    }

    const handleFilter=(filterName:string|boolean,Class:string)=>{

        setFilter(filterName)
        setBorderClass(Class)
        
    }

    const border_color=(name:string)=>{

        if(borderClass == name)return'1px solid #B83F45'

    }

    const handleEdit=(id:string,nameEdit:string)=>{

        if(!edit.state){
        edit.state = true
        edit.id = id
        setInputText(nameEdit)
        }else{
            edit.state = false
            edit.id = ''
            setInputText('')
        }

    }


return(
    
    <div className="inputContainer_Master">
        <div className="inputContainer">{<img onClick={showSearch} className={'down_arrow'} src={count >1? down_active : down_unclicked}></img>}<input value={inputText} onKeyDown={e=>e.key == "Enter" &&  AddList()} onChange={(e:any)=>setInputText(e.target.value)} placeholder="What needs to be done?"></input></div>
        <div style={data.length>0 || search_li_open ?{display:'block'}:{display:'none'}} className="container_search_select">
           <ul className="search_li">
                {filtered.map((items:any)=>{
                    !items.isDone && items_left.push(items.isDone)
                    items.isDone && items_done.push(items.id)
                
                    return(
                        <>
                         <li  className={`${items.id, items.isDone && 'isDone'}`} style={edit.id === items.id ?{backgroundColor:'#dcdcdc'}:{}}><img className="done_undone" onClick={()=>HandleChange('done_undone',items.id,!items.isDone)} src={items.isDone ? check : uncheck}></img>{<div style={{width:'100%'}} onDoubleClick={()=>handleEdit(items.id,items.title)}>{`${items.title}`}</div>}<img onClick={()=>HandleChange('remove',[items.id],null)} className="clear" src={clear}></img></li>                   
                        </>
                    )
                })}
            </ul>
            <div className="container_status">   <div style={{marginLeft:'-15px',width:'100px'}}><span >{`${items_left.length} item${items_left.length >1 || items_left.length == 0 ?'s' : ''} left`}</span></div>  <div className="container_select_option"> <div onClick={(e:any)=>handleFilter('all','all')} className={`select_span`} style={{border:border_color('all')}}><span>All</span></div>  <div onClick={(e:any)=>handleFilter(false,'active')} className="select_span" style={{border:border_color('active')}}><span>Active</span></div>   <div onClick={(e:any)=>handleFilter(true,'completed')} className="select_span" style={{border:border_color('completed')}}><span>Completed</span></div></div> <span onClick={handleRemove} className={`${ items_done.length > 0 ? 'clear_completed show' : 'clear_completed hide'}`}>Clear Completed</span></div>
        </div>
    </div>
    

)


}
export default InputSearch