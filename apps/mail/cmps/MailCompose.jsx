const {useState,useEffect} =React
const {useNavigate} = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js";

export function MailCompose({isComposeOpen, paramsInfo}) {
    const [closeControl, setControl] = useState(true);
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (paramsInfo) {
            console.log(paramsInfo);
            if (paramsInfo.noteTitle) {
                setSubject(paramsInfo.noteTitle);
            }
            if (paramsInfo.noteText) {
                setBody(paramsInfo.noteText);
            }
        }
    }, [paramsInfo]);

    function sendEmail(ev) {
        ev.preventDefault();
        const newMail = {
            to: to,
            subject: subject,
            body: body
        }
        mailService.sentMailFormat(newMail);
        isComposeOpen(!closeControl);
        navigate('/mail')
        showSuccessMsg('Mail sent');
    }
  
    return (
        <section className="compose-modal">
            <form onSubmit={sendEmail}>
                <header className="compose-header">
                    <h1>New Message</h1>
                    <button className="compose-close-btn" onClick={() => {
                        isComposeOpen(closeControl)
                        navigate('/mail')
                    }}><i className="fa-solid fa-x"></i></button>
                </header>
                <input name="to" type="text" placeholder="To:" value={to} onChange={e => setTo(e.target.value)} />
                <input name="subject" type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
                <textarea name="body" id="" cols="50" rows="20" value={body} onChange={e => setBody(e.target.value)}></textarea>
                <button className="submit-btn">Send</button>
            </form>
        </section>
    )
}
