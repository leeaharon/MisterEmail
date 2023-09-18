
import { EmailPreview } from "./EmailPreview";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { IoIosStarOutline } from "@react-icons/all-files/Io/IoIosStarOutline";
import { IoIosStar } from "@react-icons/all-files/Io/IoIosStar";


import { useEffect, useState } from 'react'



export function EmailList({ emails, onRemove }) {

    const [checked, setChecked] = useState(false);

 /* const handleChange = () => {
    setChecked(!checked);
  };
  console.log("checkbox:",checked);*/

    return (

        <ul className="email-list">
            {emails.map(email =>
                <li key={email.id}>
                    <div className="email-action">
                        <button onClick={() => onRemove(email.id)}><MdDelete /></button>
                    </div>
                    <div>
                    <button onClick={() => onStar(email.id)}><IoIosStarOutline /></button>
                    <button onClick={() => onStar2(email.id)}><IoIosStar /></button>


                    </div>
                  
                    <EmailPreview email={email} />
                </li>)
            }
        </ul>

    )
}