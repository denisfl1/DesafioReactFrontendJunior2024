import uncheck from "../images/unchecked.png"
import check from "../images/checked.png"
import clear from "../images/close.png"
import editIcon from "../images/editar.png"
import down_unclicked from "../images/down-gray.png"
import down_active from "../images/down-black.png"
import {useEffect, useState } from "react"


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
    
    const [inputText,setInputText] = useState<string>('')
    const [data,setData] = useState<any>([])
    const [dataFiltered,setDataFiltered]= useState<Data_types[]>([])
    const [count,setCount] = useState<number>(items_done.length)
    const [filter,setFilter] = useState<string|boolean>('all')
    const [borderClass,setBorderClass]= useState<string>('all')
    const [edit,setEdit]= useState<boolean>(false)
    const [id,setId] = useState<string>('')
    const [activeButton,setActiveButton]= useState<boolean>(false)


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

    setCount(items_done.length)
       
    if(filter !== 'all'){
       setActiveButton(true)
       return setDataFiltered(data.filter((its:Data_types)=>
        {return its.isDone == filter}))
    }
        return  setDataFiltered(data)

     

    },[items_done,filter,data])

   

    useEffect(()=>{


        (async()=>{

            await fetch('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos').then(
                response=>response.json().then(
                DATAs=>setData(DATAs)).catch(
                error=>console.log(error))
            )

        })()
       

    

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

    const AddList=()=>{

        if(inputText === '')return

        let randomId = Math.random().toString(36).substring(2,9)
        
        const search = data.find((item:any) =>item.id != id && item.title.toLowerCase() === inputText.toLowerCase())

        if(search)return alert("Tarefa já existe!")

       if(!edit)return setData((prev:Data_types[])=>[{id:randomId,title:inputText,isDone:false},...prev])

            setData((prev:Data_types[])=>prev.map(its=>its.id == id ?{...its,title:inputText}:its))
            setEdit(false)
            setId('')
        
    }

    const showSearch=()=>{
        

        if(data.length>0){

        setData((prev:Data_types)=>
            prev.map((it:Data_types)=>
                it?{...it,isDone:true}:it
            )
        )

        }
        if(count>1){
            setActiveButton(false)
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
                prev.filter((it: Data_types) => it.id != ids)
            )

        })    
        setActiveButton(false)
    }

    const handleFilter=(filterName:string|boolean,Class:string)=>{

        setFilter(filterName)
        setBorderClass(Class)
        
    }

    const border_color=(name:string)=>{

        if(borderClass == name){return'1px solid #ff9e81'}

    }

    const handleEdit = (ID:string,nameEdit:string)=>{


        if(!edit){    
         setEdit(true)
         setId(ID)
            setInputText(nameEdit)
        }else{
            setEdit(false)
            setId('')
            setInputText('')
        }

    }

return(
    
    <div className="inputContainer_Master">
        <div className="inputContainer">{<img onClick={showSearch} className={'down_arrow'} src={count >1 || activeButton? down_active : down_unclicked}></img>}<input value={inputText} onKeyDown={e=>e.key == "Enter" &&  AddList()} onChange={(e:any)=>setInputText(e.target.value)} placeholder="What needs to be done?"></input></div>
        {data.length >0 ? <><div className={`container_search_select `} style={{borderTop:dataFiltered[0] ?'2px solid #f0f0f0':'3px solid #e2e2e2'}}>
           <ul className="search_li">
                {dataFiltered && dataFiltered.map((items:Data_types)=>{
                    !items.isDone && items_left.push(items.isDone)
                    items.isDone && items_done.push(items.id)
                
                    return(
                        <>
                         <li  className={`${items.id, items.isDone && 'isDone'}`} style={id === items.id ?{backgroundColor:'#dcdcdc'}:{}}><img className="done_undone" onClick={()=>HandleChange('done_undone',items.id,!items.isDone)} src={items.isDone ? check : uncheck}></img>{<div style={{width:'100%'}} onDoubleClick={()=>handleEdit(items.id,items.title)}>{`${items.title}`}</div>}<img onClick={()=>id != items.id &&HandleChange('remove',items.id,null)} className={id == items.id ?"edit" :"clear"} src={id == items.id ?editIcon :clear}></img></li>                   
                        </>
                    )
                })}
            </ul>
          
            <div className="container_status" style={dataFiltered.length >0 ?{borderTop: '1px solid #cfcfcf'}:{}}> <div style={{marginLeft:'-15px',width:'100px'}}><span >{`${items_left.length} item${items_left.length >1 || items_left.length == 0 ?'s' : ''} left`}</span></div>  <div className="container_select_option"> <div onClick={(e:any)=>handleFilter('all','all')} className={"select_span"} style={{border:border_color('all')}}><span>All</span></div>  <div onClick={()=>handleFilter(false,'active')} className="select_span" style={{border:border_color('active')}}><span>Active</span></div>   <div onClick={()=>handleFilter(true,'completed')} className="select_span" style={{border:border_color('completed')}}><span>Completed</span></div></div> <span onClick={handleRemove} className={`clear_completed ${count > 0 ? ' show' : 'hide'}`}>Clear Completed</span></div>
                
        </div>
       <div className="paper1"></div>
       <div className="paper2"></div>
       </>:<></>}
       

    </div>
    

)


}
export default InputSearch