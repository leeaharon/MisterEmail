import { useEffect, useState } from 'react'

import { Link } from "react-router-dom";

import { Outlet, useNavigate, useParams } from "react-router"

import { emailService } from "../services/email.service";

import { EmailList } from '../cmps/EmailList';

import { IoArrowBackCircleSharp } from "@react-icons/all-files/Io5/IoArrowBackCircleSharp";

import { EmailFilter } from '../cmps/EmailFilter';
import { EmailNav } from '../cmps/EmailNav';





export function MailIndex() {

    const [emails, setEmails] = useState(null)
    const navigate =useNavigate()
    const [filterBy, setfilterBy] = useState({
        subject: '',
        folder:'inbox'
    })


    useEffect(() => {
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        try {
            console.log("flilter", filterBy)

            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }


    async function onRemoveEmail(emailId) {
        try {
            console.log('emailId', emailId);
            await emailService.remove(emailId)
            setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId))
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }


    async function onSaveeEmail(emailId) {
        try {
            console.log('emailId', emailId);
            await emailService.save(emailId)
            setEmails((prevEmails) => prevEmails.filter(email => email.id == emailId))
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }

    async function ontoggleisStar(mail) {
        try {

            mail.isStarred = !mail.isStarred

            await emailService.save(mail)
            setEmails(emails.map(email => {
                if (email.id === mail.id) {
                    return { ...email, isStarred: mail.isStarred };
                }
                return email;
            }))
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }

    function onSetFilter(filterBy) {

        setfilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
    }

    async function onSendMail(mail){
  try{
    const addEmail=await emailService.save(mail)
    setEmails((prevEmails)=>[addEmail,...prevEmails])
    console.log("add email",addEmail);
    navigate('/mail')
  }
  catch (err){
    console.log("the mail not send",err);

  }

    }

    console.log(emails);
    if (!emails) return <div>Loading...</div>
    return (

        <section className="emails_index">
            <EmailFilter onSetFilter={onSetFilter} />
            <EmailList emails={emails} onRemove={onRemoveEmail} onSave={onSaveeEmail}
                ontoggleisStar={ontoggleisStar}
            />
            <EmailNav onSetFilter={onSetFilter} />
            <Outlet context={{onSendMail}} />
        </section>
    )
}
