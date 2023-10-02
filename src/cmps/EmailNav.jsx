import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export function EmailNav({onSetFilter}) {

    const [filterByToEdit, setfilterByToEdit] = useState({ subject: '', isRead: null, isStarred: null })
    const [folder,setfolder]=useState('inbox')
    // useEffect(() => {
    //     onSetFilter(filterByToEdit)

    // }, [filterByToEdit])

    useEffect(() => {
        onSetFilter({folder})

    }, [folder])
    
    function onSetFolder(folder)
    {
        setfolder(folder)
    }

 


    function handleReadChange() {


        //setfilterByToEdit((prevFilter) => ({ ...prevFilter, isRead: true }))
    }
    function handleAllmail() {

        setfilterByToEdit((prevFilter) => ({ ...prevFilter,isRead:null,isStarred:null,from:''}))
    }
    function handlestarmail() {

        setfilterByToEdit((prevFilter) => ({ ...prevFilter, isStarred: true }))
    }
    function handleunRead() {

        setfilterByToEdit((prevFilter) => ({ ...prevFilter, isRead: false }))
    }
    function handlesentmail() {

        setfilterByToEdit((prevFilter) => ({ ...prevFilter, from: 'lee@gmail.com' }))
    }

    return (
        <div className="EmailNav">
            <div >
            <Link to="/mail/compose"><button className="btncompose"> Compose</button></Link>
            </div> 
            <div className="EmailNavoption">
            <button className="btnallmail" onClick={()=>onSetFolder('inbox')}>Inbox</button>
            <button className="btnread" onClick={()=>onSetFolder('read')} >Read</button>
            <button className="btnunread" onClick={handleunRead}>UnRead</button>
            <button className="btnstar" onClick={handlestarmail}>Stars</button>
            <button className="btndraft" onClick={handlestarmail}>Draft</button>
            <button className="btnsentmail" onClick={handlesentmail}>Sent</button>


            </div>
        </div>

    )
}
