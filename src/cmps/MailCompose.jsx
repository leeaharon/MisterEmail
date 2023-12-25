import React from 'react'
import { useEffect, useState } from "react";

import { Navigate, useOutletContext } from 'react-router'
import { Link, useNavigate, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";



export default function MailCompose(props) {
  const { onSendMail } = useOutletContext()
  const [email, setEmail] = useState(emailService.createEmail())
  const [viewstate, setViewstate] = useState("full")


 useEffect(()=>{  
    const interval = setInterval(() => {
      createDraftMail()
    }, 6000);
    return () => clearInterval(interval);
  }, [email.id,email.to,email.subject,email.body]);


  async function createDraftMail(){

    const updateMail= {...email,isDraft:true}

    const email2=await emailService.save(updateMail)
    
    setEmail(email2)
 }

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

  async function onSubmitEmail(ev) {
    ev.preventDefault()
    try {
      onSendMail(email)
    }
    catch (err) {
      console.log("the mail not send", err);

    }


    // onAddEmail(email)

  }
  function onChangeView() {
    if(viewstate==='full') setViewstate('min')
    else setViewstate('full')

  }

  const { to, subject, body } = email

  return (
    <div className="mail-compose">
      <section className="compose-header">
      <h2>new mail</h2>
      <Link to="/mail"><button className="close-btn">x</button></Link>
      <button className="down-btn" onClick={onChangeView}>-</button>
      {/* <Link to="/mail"><button className="down-btn" onClick={onChangeView}>-</button></Link> */}
      </section>
        {viewstate==='full' && <div className="body-mail-compose">
        <form onSubmit={onSubmitEmail} className="body-mail-compose-form">
          <input className="composeto" value={to} onChange={handleChange} name="to" type="text" id="to" placeholder="to:" />
          <input className="composesubject" value={subject} onChange={handleChange} name="subject" type="text" id="subjectnewmail" placeholder="subject:" />
          <input className="composebody" value={body} onChange={handleChange} name="body" type="text" id="bodymessage" placeholder="message:" />
          <button className="send-btn" >Send</button>
          </form>

        </div>}



    </div>
  )
}
