import { useEffect, useState } from 'react'

import { Link } from "react-router-dom";

import { emailService } from "../services/email.service";

import { EmailList } from '../cmps/EmailList';


import { IoArrowBackCircleSharp } from "@react-icons/all-files/Io5/IoArrowBackCircleSharp";
import { EmailFilter } from '../cmps/EmailFilter';




export function MailIndex() {

    const [emails, setEmails] = useState(null)
    const [filterBy, setfilterBy] = useState({
        subject:''
    })

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        try {
            console.log("flilter",filterBy)

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

    function onSetFilter(filterBy) {
        
        setfilterBy((prevFilterBy) => ({ ...prevFilterBy,...filterBy }))
    }


    console.log(emails);
    if (!emails) return <div>Loading...</div>
    return (
        <section className="emails_index">
            <span> <Link  to={"/"}><IoArrowBackCircleSharp /> back </Link></span>

            <h1>Welcome to mail box </h1>
            <EmailFilter onSetFilter={onSetFilter} />
            <EmailList emails={emails} onRemove={onRemoveEmail} />


        </section>
    )
}
