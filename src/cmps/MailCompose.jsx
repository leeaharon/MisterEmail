import React from 'react'
import { useEffect, useState } from "react";

import { Navigate, useOutletContext } from 'react-router'
import { Link, useNavigate, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";



export default function MailCompose(props) {
  const { onSendMail } = useOutletContext()
  const [email, setEmail] = useState(emailService.createEmail())


  function handleChange({ target }) {
    let { name: field, value, type } = target
    switch (type) {
        case 'number':
        case 'range':
            value = (+value || '')
            break;
        case 'checkbox':
            value = target.checked
        default:
            break;
    }
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
}

async function onSubmitEmail(ev){
  ev.preventDefault()
  try{
    onSendMail(email)
  }
  catch (err){
    console.log("the mail not send",err);

  }


 // onAddEmail(email)

}
  

  const { to, subject, body } = email

  return (
    <div className="mail-compose">
      <h1>new mail</h1>
      <form onSubmit={onSubmitEmail} >
      <Link to="/mail"><button className="close-btn">X</button></Link>
        <input value={to} onChange={handleChange} name="to" type="text" id="to" placeholder="mail to:" />
        <input value={subject} onChange={handleChange} name="subject"  type="text" id="subjectnewmail" placeholder="subject:" />
        <input value={body} onChange={handleChange} name="body"  type="text" id="bodymessage" placeholder="message:" />
        <button className="send-btn">Send</button>


      </form>

    </div>
  )
}
