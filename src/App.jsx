import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [inval, setInval] = useState("")
  const [tlist, setTlist] = useState([])
  const [switchlist, setSwitchlist] = useState(true)

  const [booleacompleted, setBooleacompleted]= useState(false)
  const editindex = useRef(null)
  const inputtoadd = useRef(null)

  useEffect(() => {
    let storedarraystring = localStorage.getItem('tlist')
    if (storedarraystring){
      let storedlist = JSON.parse(storedarraystring)
      setTlist(storedlist) 
    }
  }, [])

  useEffect(() => {
    locsave();
  }, [tlist]);
  

  function locsave(){
    localStorage.setItem("tlist",JSON.stringify(tlist))
  }

  function changein(e) {
    setInval(e.target.value)
  }

  function submit() {

    if (editindex.current!=null){
      // console.log(editindex.current)
      let objclone = [...tlist]
      // console.log(objclone[editindex.current])
      objclone[editindex.current].inval = inval
      setTlist(objclone)
      editindex.current = null
      setInval('')
    }
    else{
      let myuuid = uuidv4();
      setTlist([...tlist, { id: myuuid, inval, iscompleted: false }])
      setInval('')
    }
    inputtoadd.current.focus()
  }

  function checkchange(e) {

    // Filter doesn't work because although we can change the value of the state, but since we don't use setTlist, the re-render is not triggerred
    // tlist.filter((it) => {
    //   if (it.id == coming_change) {
    //     it.iscompleted = !it.iscompleted
    //     console.log(tlist[it])
    //   }
    // })

    let index = tlist.findIndex(item => item.id === e.target.name)  //This function basically iterates over the all the items in an array, then for whichever iteration the provided callback function returns true the index is provided back as a return value of the findindex() funntion
    let objclone = [...tlist]
    objclone[index].iscompleted = !objclone[index].iscompleted
    setTlist(objclone)
  }

  async function deletehandler(e, id){

    let index = tlist.findIndex(it=>it.id == id)
    

    if (editindex.current!=null){
      if (editindex.current>index){
        editindex.current = editindex.current - 1
      }
      else if(editindex.current==index){
        editindex.current = null
      }
    }

    //using SPLICE Method to remove the elements in the array 'tlist' with help of tlist[index] and id

    // let objclone = [...tlist]
    // objclone.splice(index, 1)
    // setTlist(objclone)

    //we can also use filter function of arrays to delete object
    let newarr = tlist.filter(it=>it.id!=id) //Filter method returns a new array as per the callback function((it)=>{return it.id!=id}) the callback return true of false and accordingly, the iterations are included or ommited from the new array that is being created
    setTlist(newarr)
  }

  function edithandler(e, id){
    let index = tlist.findIndex(it=>it.id == id)
    editindex.current = index
    setInval(tlist[index].inval)
    inputtoadd.current.focus()
  }

  function listtoggle(e){
    e.target.id=='alltask'?setSwitchlist(true):setSwitchlist(false)
    // console.log(tlist)
    e.target.id=='pending'&&setBooleacompleted(false)
    
    e.target.id=="completed"?setBooleacompleted(true):setBooleacompleted(false)


    console.log(booleacompleted)
  }

  function checkcondition(boolea){
    if(boolea && booleacompleted){
       return true
    }
    else if(boolea==false && booleacompleted==false){
      return true
    }
    else{
      return false
    }
  }

  return (
    <>
      <Navbar />
      <div className="main bg-gradient-to-r from-gray-500 to-slate-300 h-[100vh] w-[100vw] p-6 overflow-x-hidden">

        <div className="inside1 h-[85vh] rounded-3xl w-[80vw] mx-auto flex gap-3 flex-col justify-center items-center text-white">
          {/* Upper div */}
          <div className="addbox bg- h-[13%] w-[70%] rounded-[18px] flex justify-center items-center gap-10">
            <input ref={inputtoadd} type="text" value={inval} onChange={changein} className='w-[68%] h-10 px-3 rounded-xl bg-[#EEEEEE] shadow-slate-700 shadow-[2px_3px_8px_rgba(0,0,0,0.38)] focus:shadow-[4.0px_4.0px_8.0px_rgba(0,0,0,0.38)] focus:shadow-slate-900 text-black cursor-text outline-none focus:-translate-y-[2px] transition-all duration-300' />
            <button disabled={inval.length < 3} className='disabled:bg-[#c95400] w-24 h-12 bg-[#ff6a00] rounded-lg font-semibold text-base hover:scale-105 transition-all cursor-pointer' onClick={submit} >Add Task</button>
          </div>
          {/* Middle Div */}
          <div className="switchlist h-[8%] w-[70%] flex justify-center items-center gap-10 text-center transition-all duration-600">
            <div id='alltask' onClick={e=>listtoggle(e)} className="pending w-[20%] rounded-md font-normal bg-slate-700 hover:bg-slate-900 hover:-translate-y-1 transition-all cursor-pointer duration-200 shadow-black hover:shadow-slate-800 shadow-[3.0px_2.0px_4.0px_rgba(0,0,0,0.38)] hover:shadow-[4.0px_4.0px_8.0px_rgba(0,0,0,0.38)]">Your day</div>
            <div id='pending' onClick={e=>listtoggle(e)} className="completed w-[20%] bg-or rounded-md font-normal bg-slate-700 hover:bg-slate-900 hover:-translate-y-1 transition-all cursor-pointer duration-200 shadow-black hover:shadow-slate-800 shadow-[3.0px_2.0px_4.0px_rgba(0,0,0,0.38)] hover:shadow-[4.0px_4.0px_8.0px_rgba(0,0,0,0.38)]">Pending</div>
            <div id='completed' onClick={e=>listtoggle(e)} className="completed w-[20%] bg-or rounded-md font-normal bg-slate-700 hover:bg-slate-900 hover:-translate-y-1 transition-all cursor-pointer duration-200 shadow-black hover:shadow-slate-800 shadow-[3.0px_2.0px_4.0px_rgba(0,0,0,0.38)] hover:shadow-[4.0px_4.0px_8.0px_rgba(0,0,0,0.38)]">Completed</div>
          </div>

          {/* List Div */}
          <div className="itembox bg-[#EEEEEE] border-slate-600 rounded-[10px] h-[70%] w-[80%] overflow-y-auto overflow-x-hidden">
            <ul className='flex justify-start items-start gap-4 flex-col py-6 px-5 transition-all text-black '>

              {tlist.length > 0 ? (tlist && tlist.map && tlist.map((ls) => {
                return (switchlist || checkcondition(ls.iscompleted))&&(<div key={ls.id} className='flex justify-between items-start w-[99%]'>
                  <input type="checkbox" name={ls.id} checked={ls.iscompleted} onChange={checkchange} className='mt-2 scale-125' />
                  <li className={`workliststyle list-none w-[80%] border-b-[0.5px] border-gray-400 rounded-sm px-2 font-medium ${ls.iscompleted ? 'line-through' : ''}`}>{ls.inval}</li>

                  <div className='flex gap-3 text-neutral-100'>

                    <button onClick={e => edithandler(e, ls.id)} className='w-12 h-7 bg-slate-300 text-gray-500 rounded-lg hover:scale-105 font-medium shadow-[1.0px_1.0px_1.0px_rgba(0,0,0,0.38)] transition-all hover:shadow-[2.0px_2.0px_4.0px_rgba(0,0,0,0.38)]'>Edit</button>
                    <button onClick={e => deletehandler(e, ls.id)} className='w-[60px] h-7 rounded-lg bg-slate-300 text-gray-500 font-medium hover:scale-105 transition-all shadow-[1.0px_1.0px_1.0px_rgba(0,0,0,0.38)] hover:shadow-[2.0px_2.0px_4.0px_rgba(0,0,0,0.38)]'>Delete</button>
                  </div>

                </div>)
              })):(
                <li className='workliststyle list-none w-[99%] text-xl rounded-sm px-2 text-center'>Add a Task to plan your Day !</li>
              )
              }

            </ul>
          </div>

        </div>

      </div>
    </>
  )
}

export default App

// workliststyle list-none w-[80%] border-b-[0.5px] border-gray-400 rounded-sm px-2
