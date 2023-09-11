import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { emailService } from "../services/email.service";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "@react-icons/all-files/Io5/IoArrowBackCircleSharp";



export function MailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadEmails()

    }, [])

    async function loadEmails() {
        try {
            const email = await emailService.getById(params.mailId)
            setEmail(email)
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }
    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details">
             <Link to={"/mail"}><IoArrowBackCircleSharp/> back </Link>
            <h1><span>subject: {email.subject}</span></h1>
            <h5>from: {email.from}</h5>
            <h6>{email.to}</h6>
            <h3>message: {email.body}</h3>
      
        </section>
    )
}