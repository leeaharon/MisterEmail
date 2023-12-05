import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import imgUrl from '../assets/imgs/edit.png'



export function EmailNav({ onSetFilter, countUnread }) {

    const [filterByToEdit, setfilterByToEdit] = useState({ subject: '', isRead: null, isStarred: null })
    const [folder, setfolder] = useState('inbox')
    const counterUnreadMails = countUnread

    console.log("counterUnreadMails", counterUnreadMails);
    // useEffect(() => {
    //     onSetFilter(filterByToEdit)

    // }, [filterByToEdit])

    useEffect(() => {
        onSetFilter({ folder })

    }, [folder])

    function onSetFolder(folder) {
        setfolder(folder)
    }




    // function handleReadChange() {


    //     //setfilterByToEdit((prevFilter) => ({ ...prevFilter, isRead: true }))
    // }
    // function handleAllmail() {

    //     setfilterByToEdit((prevFilter) => ({ ...prevFilter,isRead:null,isStarred:null,from:''}))
    // }
    // function handlestarmail() {

    //     setfilterByToEdit((prevFilter) => ({ ...prevFilter, isStarred: true }))
    // }
    // function handleunRead() {

    //     setfilterByToEdit((prevFilter) => ({ ...prevFilter, isRead: false }))
    // }
    // function handlesentmail() {

    //     setfilterByToEdit((prevFilter) => ({ ...prevFilter, from: 'lee@gmail.com' }))
    // }

    return (
        <div className="EmailNav">
            <div >
                <Link to="/mail/compose">
                    <button className="btncompose">
                    <img src={imgUrl} alt="" />
                        Compose
                    </button>
                   

                </Link>


            </div>
            <div className="EmailNavoption">
                <button className="btnallmail" onClick={() => onSetFolder('inbox')}>Inbox {counterUnreadMails}</button>

                <button className="btnread" onClick={() => onSetFolder('read')} >Read</button>
                <button className="btnunread" onClick={() => onSetFolder('unread')}>UnRead</button>
                <button className="btnstar" onClick={() => onSetFolder('stars')}>Stars</button>
                <button className="btndraft" onClick={() => onSetFolder('draft')}>Draft</button>
                <button className="btnsentmail" onClick={() => onSetFolder('sent')}>Sent</button>
                <button className="btnbinmail" onClick={() => onSetFolder('bin')}>Bin</button>



            </div>
        </div>

    )
}
