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

    return (
        <div className="EmailNav">
            <div >
            <Link to="/mail/compose"><button> Compose</button></Link>
            </div> 
            <button onClick={handleReadChange} >Read</button>
            <button>UnRead</button>
            <button onClick={handleAllmail}>All Mail</button>
            <button onClick={handlestarmail}>Stars</button>
        </div>

    )
}
