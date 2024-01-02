import { HiMail } from "@react-icons/all-files/hi/HiMail";
import { IoArrowBackCircleSharp } from "@react-icons/all-files/Io5/IoArrowBackCircleSharp";

import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { IoIosStarOutline } from "@react-icons/all-files/Io/IoIosStarOutline";
import { IoIosStar } from "@react-icons/all-files/Io/IoIosStar";
import { format } from 'date-fns';

import { Link } from "react-router-dom";
export function EmailPreview({ email, ontoggleisStar, onRemove , onReadEmail}) {

    const isBold = email.isRead ? 'light' : 'dark'

    let currentDate = format(email.sentAt, 'MMMM do yyyy, h:mm:ss a');
    console.log(currentDate);
    return (
        <li className={`email-preview grid ` + isBold}>
            <div className="star">
                <button className="btnstar" onClick={() => ontoggleisStar(email)}>
                    {email.isStarred ? <IoIosStar style={{ color: "#fff700", }} />
                        : <IoIosStarOutline />}</button>
            </div>

            <Link className="open" to={`/mail/${email.id}`} >
                <div className="mail-content grid " >
                    <span className="mail-from">{email.from}</span>
                    <span className="mail-to">{email.to}</span>
                    <span className="mail-subject">{email.subject}</span>
                    <span className="mail-body">{email.body}</span>
                </div>

               
            </Link>
            <span className="mail-date">{currentDate}</span>  
            <div className="email-action">
                {/* <button onClick={() => onRemove(email.id)}><MdDelete /></button> */}
                <button onClick={() => onRemove(email)}><MdDelete /></button>
                <button onClick={() => onReadEmail(email)}><HiMail /></button>

            </div>

        </li>


    )
}