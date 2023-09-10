import { HiMail } from "@react-icons/all-files/hi/HiMail";
import { Link } from "react-router-dom";

export function EmailPreview({email}){
    return(
        <article className="email-preview">
            <Link className="open" to={`/mail/${email.id}`}>
            {console.log('emailid', email.id)}
           <h1><HiMail /> </h1> 
           <h2>{email.from}</h2> 
           <h2>{email.subject}</h2>
           </Link>



        </article>
        
        
    )
}