const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js";

export function MailPreview({mail}) {
    const fullDate = utilService.formatDate(mail.sentAt)

    return (
        <Link className="mail-a-link" to={`/mail/${mail.id}`}>  
            <section className="email-item">
                <div className="email-from">{mail.from}</div>
                <div className="email-subject">{mail.subject}</div>
                <div className="email-body-preview">{mail.body.slice(0, 70)}...</div>
                <div className="email-timestamp">{fullDate}</div>      
            </section>
        </Link>
    )
}
