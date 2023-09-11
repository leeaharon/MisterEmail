import { useEffect, useState } from 'react'

import { Link } from "react-router-dom";

import { emailService } from "../services/email.service";

import { EmailList } from '../cmps/EmailList';


import { IoArrowBackCircleSharp } from "@react-icons/all-files/Io5/IoArrowBackCircleSharp";




export function MailIndex() {

    const [emails, setEmails] = useState(null)
    useEffect(() => {
        loadEmails();
    }, [])

    async function loadEmails() {
        try {
            const emails = await emailService.query()
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


    console.log(emails);
    if (!emails) return <div>Loading...</div>
    return (
        <section className="emails_index">
            <span> <Link  to={"/"}><IoArrowBackCircleSharp /> back </Link></span>

            <h1>Welcome to mail box </h1>

            <EmailList emails={emails} onRemove={onRemoveEmail} />


        </section>
    )
}
