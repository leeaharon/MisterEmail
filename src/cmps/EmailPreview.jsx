import { HiMail } from "@react-icons/all-files/hi/HiMail";
import { IoArrowBackCircleSharp } from "@react-icons/all-files/Io5/IoArrowBackCircleSharp";

import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { IoIosStarOutline } from "@react-icons/all-files/Io/IoIosStarOutline";
import { IoIosStar } from "@react-icons/all-files/Io/IoIosStar";

import { Link } from "react-router-dom";

export function EmailPreview({ email,ontoggleisStar,onRemove }) {

    const isBold = email.isRead ? 'light' : 'dark'
    console.log("isread in preview class", isBold);


    return (
        <li className={`email-preview grid `+isBold}>
              <div className="star">
                <button  onClick={() => ontoggleisStar(email)}>
                    {email.isStarred ? <IoIosStar style={{ color: "#fff700", }} />
                        : <IoIosStarOutline />}</button>
             </div>

            <Link className="open" to={`/mail/${email.id}`}>
                    <div className="mail-content grid ">
                        {/* <div className={isBold}> */}
                        <span className="mail-from">{email.from}</span>
                        <span className="mail-subject">{email.subject}</span>
                        {/* <span className="mail-sepereator">-</span> */}
                        <span className="mail-body">{email.body}</span>
                        {/* </div> */}
                    </div>
                
                    {/* <div className={dynClass}>
                    <span>{email.from}</span>
                    <h2>{email.subject}</h2></div> */}
            </Link>
            <span className="mail-date">{email.sentAt}</span>
            <div className="email-action">
                <button onClick={() => onRemove(email.id)}><MdDelete /></button>
            <span ><HiMail /> </span>
            </div>
          
        </li>


    )
}