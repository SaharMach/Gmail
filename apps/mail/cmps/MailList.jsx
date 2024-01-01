const { useState, useEffect } = React

import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail.service.js";

export function MailList({ mails, onRemoveMail, onStarSelect }) {
    const [sortedMails, setSortedMail] = useState('')
    const [mailsToDisplay, setMailsToDisplay] = useState(mails)

    useEffect(() => {
        console.log(mails);
        switch (sortedMails) {
            case 'read':
                setMailsToDisplay(mails.filter(mail => mail.isRead))
                break;
            case 'unread':
                setMailsToDisplay(mails.filter(mail => !mail.isRead))
                break;
            default:
                setMailsToDisplay(mails)
        }
    }, [mails, sortedMails])

    function toggleMailReadStatus(mailId) {
        setMailsToDisplay(prevMails => {
            return prevMails.map(mail => {
                if (mail.id === mailId) {
                    return { ...mail, isRead: !mail.isRead }
                }
                return mail;
            });
        });
    }

    function handleChange({ target }) {
        console.log('hey')
        setSortedMail(target.value)
    }

    function handleMailClick(ev, mailId, val) {
        ev.stopPropagation();
        toggleMailReadStatus(mailId);
        mailService.markAsRead(mailId, val)
            .then(updatedMail => {
                console.log(updatedMail);
            })
            .catch(error => {
                console.error("Failed to update mail read status:", error);
                toggleMailReadStatus(mailId);
            })
    }

    if (!mailsToDisplay || !mails) return <div>No mails to show</div>
    return (
        <ul className="mails-list">
            <section className="mail-list-header">
                <section className="drop-down-container">
                    <select className="clean-btn" id="mail-dropdown" onChange={(ev) => handleChange(ev)}>
                        <option value=""></option>
                        <option name="read" value="read">Read</option>
                        <option name="unread" value="unread">Unread</option>
                    </select>
                </section>
                <button className="clean-btn">
                    <span class="material-symbols-outlined">
                        refresh
                    </span>
                </button>
            </section>
            {mailsToDisplay.map(mail => (
                <li className={`mail ${mail.isRead ? 'read' : ''}`}
                    onClick={(event) => handleMailClick(event, mail.id, !mail.isRead)}
                    key={mail.id}>
                    <article className="mail-preview">
                        <span className={`star ${mail.isStar ? 'starred' : ''}`}
                            onClick={(event) => {
                                event.stopPropagation()
                                onStarSelect(mail.id)
                            }}>
                            <i className={`fa-${mail.isStar ? 'solid' : 'regular'} fa-star`}></i>
                        </span>
                        <section className="mail-preview-btns">
                            <button className="prev-btn read-btn clean-btn" onClick={(event) => handleMailClick(event, mail.id, !mail.isRead)}>
                                <span title="Mark as read" className="material-symbols-outlined">
                                    {mail.isRead ? 'drafts' : 'mail'}
                                </span>
                            </button>
                            <button className="prev-btn archive-btn clean-btn">
                                <span className="material-symbols-outlined">
                                    archive
                                </span>
                            </button>
                            <button className="prev-btn delete-btn clean-btn" onClick={(event) => {
                                event.stopPropagation()
                                onRemoveMail(mail.id)
                            }}>
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </section>
                    </article>
                    <MailPreview key={mail.id} mail={mail} />
                </li>
            ))}
        </ul>
    )
}

