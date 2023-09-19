
import { EmailPreview } from "./EmailPreview";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { IoIosStarOutline } from "@react-icons/all-files/Io/IoIosStarOutline";
import { IoIosStar } from "@react-icons/all-files/Io/IoIosStar";


import { useEffect, useState } from 'react'
import { emailService } from "../services/email.service";



export function EmailList({ emails, onRemove,ontoggleisStar }) {

    
    

    return (

        <ul className="email-list">
            {emails.map(email =>
                <li key={email.id}>
                    <div className="email-action">
                        <button onClick={() => onRemove(email.id)}><MdDelete /></button>
                    </div>
                    <div>
                    <button onClick={() => ontoggleisStar(email) }>
                        {email.isStarred?<IoIosStar />:<IoIosStarOutline />}</button>
                   

                    </div>
                  
                    <EmailPreview email={email} />
                </li>)
            }
        </ul>

    )
}