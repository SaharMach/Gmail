const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"
import { MailCompose } from "./MailCompose.jsx"
const {useParams} = ReactRouterDOM

export function MailSorting({ toggleToolBar, setMails }) {
    const [setActive, onSetActive] = useState('inbox')

    const [mailCount, setMailCounts] = useState(0)
    const params = useParams()
    let isParamsNotFull = JSON.stringify(params) === JSON.stringify({}) 
    const isInitialComposeOpen = !isParamsNotFull;
    const [setCompose, isComposeOpen] = useState(isInitialComposeOpen);
    useEffect(() => {
        if (!isParamsNotFull) {
            isComposeOpen(true);
        }
    }, [params]);
    
    
    console.log(params);

        useEffect(() => {
            setMailCounts(mailService.getMailsCount);
        }, []);

    function onSetMails(val) {
        let mails
        switch (val) {
            case 'deleted':  
                mails = mailService.getDeletedMails()
                setMails(mails)
                onSetActive(val)
                break;
            case 'inbox':
                mails = mailService.query()
                    .then(mails => setMails(mails))
                onSetActive(val)
                break;
            case 'starred':
                mails = mailService.getStarredMails() 
                setMails(mails)
                onSetActive(val)
                break;
            case 'sent':
                mails = mailService.getSentMails()     
                setMails(mails)
                onSetActive(val)
            default:
                break;
        }
    }
    
    function onClickCompose(){
        isComposeOpen(!setCompose)
        console.log('here'); 
    }
    return ( 
        <section className='sorting-container'>
            {setCompose && <MailCompose paramsInfo={params} isComposeOpen={isComposeOpen} />}
            <ul className="sorting-list">
            <li className="compose" onClick={onClickCompose}>
                <span className="material-symbols-outlined">
                    edit
                </span>
                {!toggleToolBar && <span className="compose-txt">Compose</span> }
            </li>       
            <li className={setActive === 'inbox' ? 'active' : ''} onClick={() => onSetMails('inbox')}>
                <span className="material-symbols-outlined">
                    inbox
                </span>
                {!toggleToolBar && 'Inbox'}
                {!toggleToolBar && <span className="mail-count">{mailCount}</span>}
            </li>
            <li className={setActive === 'starred' ? 'active' : ''} onClick={() => onSetMails('starred')}>
                <span className="material-symbols-outlined">
                    star
                </span>
                {!toggleToolBar && 'Starred'}
            </li>
            <li className={setActive === 'sent' ? 'active' : ''} onClick={() => onSetMails('sent')}>
                <span className="material-symbols-outlined">
                    send
                </span>  
                {!toggleToolBar && 'Sent'}    
            </li>
            <li className={setActive === 'deleted' ? 'active' : ''} onClick={() => onSetMails('deleted')}>
                <span className="material-symbols-outlined">
                    delete
                </span>
                {!toggleToolBar && `Trash`}
            </li>
            </ul>
        </section>
    )
}