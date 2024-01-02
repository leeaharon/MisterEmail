import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import imgUrl from '../assets/imgs/edit.png'
import imgUrl2 from '../assets/imgs/gmail.png'




export function EmailNav({ onSetFilter, countUnread }) {

    const [filterByToEdit, setfilterByToEdit] = useState({ subject: '', isRead: null, isStarred: null })
    const [folder, setfolder] = useState('inbox')
    const counterUnreadMails = countUnread

    console.log("counterUnreadMails", counterUnreadMails);
    

    useEffect(() => {
        onSetFilter({ folder })

    }, [folder])

    function onSetFolder(folder) {
        setfolder(folder)
    }




    return (
        <div className="EmailNav">
            <div >
            <img src={imgUrl2} alt="" />

                <Link to="/mail/compose">
                    <button className="btncompose">
                    <img src={imgUrl} alt="" />
                        Compose
                    </button>
                
                </Link>
            </div>
            <div className="EmailNavoption">
                <button className="btnallmail" onClick={() => ('inbox')}>Inbox {counterUnreadMails}</button>
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
