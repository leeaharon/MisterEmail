
import { EmailPreview } from "./EmailPreview";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";


export  function EmailList({emails, onRemove}){
    return(
        <ul className="email-list">
                    {emails.map(email=>
                    <li key={email.id}>
                     <div className="email-action">
                        <button onClick={() => onRemove(email.id)}><MdDelete/></button>
                    </div>
                    <EmailPreview email={email}/>

                    </li>)
                }
            </ul>

    )
}