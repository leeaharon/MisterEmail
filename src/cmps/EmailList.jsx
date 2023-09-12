
import { EmailPreview } from "./EmailPreview";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { useEffect, useState } from 'react'



export function EmailList({ emails, onRemove }) {

    const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  console.log("checkbox:",checked);

    return (

        <ul className="email-list">
            {emails.map(email =>
                <li key={email.id}>
                    <div className="email-action">
                        <button onClick={() => onRemove(email.id)}><MdDelete /></button>
                    </div>
                   {/*} <div>
                        <input className="star" type="checkbox" title="bookmark page" checked={checked}
                            onChange={handleChange}/>
            </div>*/}
                    <EmailPreview email={email} />
                </li>)
            }
        </ul>

    )
}