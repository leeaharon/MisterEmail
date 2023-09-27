import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export function EmailNav({onSetFilter}) {

    const [filterByToEdit, setfilterByToEdit] = useState({ subject: '', isRead: null, isStarred: null })

    useEffect(() => {
        onSetFilter(filterByToEdit)

    }, [filterByToEdit])


    function handleReadChange() {

        setfilterByToEdit((prevFilter) => ({ ...prevFilter, isRead: true }))
    }
    function handleAllmail() {

        setfilterByToEdit((prevFilter) => ({ ...prevFilter, isRead: null, isStarred: null }))
    }
    function handlestarmail() {

        setfilterByToEdit((prevFilter) => ({ ...prevFilter, isStarred: true }))
    }
    function handleunRead() {

        setfilterByToEdit((prevFilter) => ({ ...prevFilter, isRead: false }))
    }

    return (
        <div className="EmailNav">
            <div >
            <Link to="/mail/compose"><button className="btncompose"> Compose</button></Link>
            </div> 
            <div className="EmailNavoption">
            <button className="btnread" onClick={handleReadChange} >Read</button>
            <button className="btnunread" onClick={handleunRead}>UnRead</button>
            <button className="btnallmail"  onClick={handleAllmail}>All Mail</button>
            <button className="btnstar" onClick={handlestarmail}>Stars</button>
            <button className="btndraft" onClick={handlestarmail}>Draft</button>
            </div>
        </div>

    )
}
