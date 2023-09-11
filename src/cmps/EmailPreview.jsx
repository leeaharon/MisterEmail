import { HiMail } from "@react-icons/all-files/hi/HiMail";
import { IoArrowBackCircleSharp } from "@react-icons/all-files/Io5/IoArrowBackCircleSharp";

import { Link } from "react-router-dom";

export function EmailPreview({ email }) {
    return (
        <article className="email-preview">

            <Link className="open" to={`/mail/${email.id}`}>
                {console.log('emailid', email.id)}
                <span><HiMail /> </span>
                <span>{email.from}</span>
                <h2>{email.subject}</h2>
            </Link>
        </article>


    )
}