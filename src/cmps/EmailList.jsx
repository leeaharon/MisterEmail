
import { EmailPreview } from "./EmailPreview";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { IoIosStarOutline } from "@react-icons/all-files/Io/IoIosStarOutline";
import { IoIosStar } from "@react-icons/all-files/Io/IoIosStar";


import { useEffect, useState } from 'react'
import { emailService } from "../services/email.service";



export function EmailList({ emails, onRemove, ontoggleisStar ,onReadEmail}) {




    return (

        <ul className="email-list">
            {emails.map(email =>
                <EmailPreview email={email} onReadEmail={onReadEmail} onRemove={onRemove} ontoggleisStar={ontoggleisStar} key={email.id} />
            )
            }
        </ul>

    )
}