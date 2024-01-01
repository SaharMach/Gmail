const { useState, useEffect } = React
import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/MailList.jsx';
import { SearchFilter } from '../cmps/SearchFilter.jsx';
import { MailSorting } from '../cmps/MailSorting.jsx';
import { showSuccessMsg } from "../services/event-bus.service.js";
import { UserMsg } from '../../../cmps/UserMsg.jsx'
export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [toggleToolBar, setToggle] = useState(false)


    useEffect(() => {
        mailService.query(filterBy)
            .then(mailsFromService => setMails(mailsFromService));
    }, [filterBy])

    function onStarSelect(mailId) {
        mailService.markAsStar(mailId)
        setMails(prevMails => {
            return prevMails.map(mail => {
                if (mail.id === mailId) {
                    return { ...mail, isStar: !mail.isStar }
                }
                return mail;
            })
        })
    }

    function onRemoveMail(mailId) {
        console.log(mailId);
        mailService.saveDeletedMail(mailId)
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMail =>
                    prevMail.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail removed`)
            })
            .catch(err => console.log('err', err))
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function toggleFolders() {
        setToggle(!toggleToolBar)
    }

    return (

        <section className={`main-layout ${toggleToolBar ? 'open' : 'close'}`}>
            <MailSorting toggleToolBar={toggleToolBar} setMails={setMails} mails={mails} />
            <header className="main-mail-header">
                <article className="mail-logo">
                    <button className="toggle-btn" onClick={toggleFolders}><i class="fa-solid fa-bars"></i></button>
                    <img className="logo-img" src="assets/img/gmailLogo.png" alt="" />
                </article>
                <SearchFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </header>
            <MailList setMail={setMails} mails={mails} onRemoveMail={onRemoveMail} onStarSelect={onStarSelect} />
            <UserMsg />
        </section>


    )
}





