const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js";

export function MailDetail() {
    const params = useParams();
    const navigate = useNavigate()

    const [mail, setMail] = useState()

    useEffect(() => {
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
    })

    function onBack() {
        navigate('/')
    }
    if (!mail) return <div>Loading...</div>

    return (
        <div className="mail-detail-container">
            <header className="mail-detail-header">
                <h2>{mail.subject}</h2>
                <section>

                    <button onClick={onBack} className="back-btn">Back</button>
                </section>
            </header>
            <div className="mail-detail-content">
                <div className="mail-meta">
                    <p><strong>From:</strong> {mail.from}</p>
                    <p><strong>To:</strong> {mail.to}</p>
                </div>
                <div className="mail-body">{mail.body}</div>
            </div>
        </div>
    );

}
