import { Component, useEffect, useState,useRef } from "react";
import { useParams } from "react-router"
import { emailService } from "../services/email.service";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "@react-icons/all-files/Io5/IoArrowBackCircleSharp";
import { IoIosStarOutline } from "@react-icons/all-files/Io/IoIosStarOutline";
import { IoIosStar } from "@react-icons/all-files/Io/IoIosStar";
import { AiOutlinePrinter } from "react-icons/ai";
import ReactToPrint, { useReactToPrint } from "react-to-print";




export function MailDetails({ontoggleisStar}) {

    const [email, setEmail] = useState(null)

    const params = useParams()
    const printRef=useRef();
    const handlePrint=useReactToPrint({
        content:()=>printRef.current,
    });

    useEffect(() => {

        loadEmails()

    }, [])

    // useEffect(() => {



    // }, [email])



    async function loadEmails() {
        try {
            const email = await emailService.getById(params.mailId)
            email.isRead = true
            emailService.save(email)
            setEmail(email)
            console.log(email);
        } catch (err) {
            console.log('Had issues loading emails', err);
        }
    }

    async function ontoggleisStar(mail) {
        console.log(mail.id)
        console.log(mail.isStarred);
        try {
            const updateEmail={...mail,isStarred:!mail.isStarred}
            await emailService.save(updateEmail)
            setEmail((prevlEmail) => ({ ...prevlEmail, isStarred: !prevlEmail.isStarred  }))


            // mail.isStarred = !mail.isStarred
            // await emailService.save(mail)
            // // setEmail((prevlEmail) => (console.log(prevlEmail)))
            // setEmail((prevlEmail) => ({ ...prevlEmail, isStarred: !prevlEmail.isStarred  }))
            }
         catch (err) {
            console.log('Had issues loading emails', err);
        }
    }

    if (!email) return <div>Loading...</div>
    console.log('email',email);
    return (
        <div className="email-details">
            <div className="star">
                <button className="btnstar" onClick={() => ontoggleisStar(email)}>
                    {email.isStarred ? <IoIosStar style={{ color: "#fff700", }} />
                        : <IoIosStarOutline />}
                        </button></div>
            <div className="header-mail-detail">    
            <h1>{email.subject}</h1>
            <button className="printbtn" onClick={handlePrint}><AiOutlinePrinter /></button>
            <Link to={"/mail"}><IoArrowBackCircleSharp /> back </Link>
            
           
                        
             </div>
            <div ref={printRef}>
            <h5>{email.from}</h5>
            <h6>{email.to}</h6>
            <h3>{email.body}</h3>
            </div>

        </div>
    )
}