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
    const navigate = useNavigate()
    const [filterBy, setfilterBy] = useState({
        subject: '',
        folder: 'inbox'
    })
    const [countUnread, setcountUnread] = useState(null)





    useEffect(() => {
        loadEmails()
    }, [filterBy])

    useEffect(() => {
       
        countEmails()
    }, [])

    async function countEmails() {
        const countUnread = await emailService.countermails()
        setcountUnread(countUnread)
        console.log("unread count: ",countUnread)
    }



    async function loadEmails() {
        try {
            console.log("flilter", filterBy)

            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }


    // async function onRemoveEmail(emailId) {
    //     try {


    //         await emailService.remove(emailId)
    //         setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId))
    //     } catch (err) {
    //         console.log('Had issues loading emails', err);
    //     }
    // }
    async function onReadEmail(mail) {

        try{
            mail.isRead=!mail.isRead;

            await emailService.save(mail)
            setEmails(emails.map(email => {
                if (email.id === mail.id) {
                    return { ...email, isRead: mail.isRead };
                }
                return email;
            }))        }
            catch (err) {
                console.log('the mail not readed', err);
            }
        

        
    }

    async function onRemoveEmail(email) {
        if (email.removedAt) {
            try {

                await emailService.remove(email.id)

                setEmails(emails.filter(mail => mail.id !== email.id))
                // loadEmails()
            }
            catch (err) {
                console.log('Had issues remove emails', err);
            }
        }

        else {
            email.removedAt = true
            try {
                await emailService.save(email)
                setEmails(emails.filter(email => !email.removedAt)
                    // setEmails(emails.filter(email => {
                    //     if (email.id === email.id) {
                    //         return { ...email, removedAt: !email.removedAt };
                    //     }
                    // })
                )
            } catch (err) {
                console.log('Had issues loading emails', err);
            }
        }
    }



    async function onSaveeEmail(emailId) {
        try {
         
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

    async function onSendMail(mail) {
        
        try {
            const addEmail = await emailService.save(mail)
            // add a condition which breaks the pointer and activates setMails only if the reciever is equal to user name .

            if (addEmail.to ==='lee@gmail.com'){
                console.log('breaks pointer')
                setEmails((prevEmails) => [addEmail, ...prevEmails])

            }
            console.log("add email", addEmail);
            navigate('/mail')
        }
        catch (err) {
            console.log("the mail not send", err);

        }

    }

    console.log(emails);
    if (!emails) return <div>Loading...</div>
    return (

        <section className="emails_index">
            <EmailFilter onSetFilter={onSetFilter} loadEmails={loadEmails} />
            <EmailList emails={emails} onRemove={onRemoveEmail} onSave={onSaveeEmail}
                ontoggleisStar={ontoggleisStar} onReadEmail={onReadEmail}
            />
            <EmailNav onSetFilter={onSetFilter} countUnread={countUnread} />
            <Outlet context={{ onSendMail }} />
        </section>
    )
}
