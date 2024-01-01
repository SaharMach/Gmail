// mail service
import { storageService} from '../../../services/storage.service.js'
import { asyncStorageService} from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
const STORAGE_KEY = 'emailsDB'
const DELETED_MAILS_KEY = 'deletedMailsDB'
const SENT_MAILS_KEY = 'sentMailsDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getUser,
    markAsRead,
    getDefaultFilter,
    getEmptyMail,
    saveDeletedMail,
    getDeletedMails,
    markAsStar,
    getStarredMails,
    sentMailFormat,
    getSentMails,
    getMailsCount
}

const loggedinUser = {
    email: 'user@appsus.com', fullname: 'Mahatma Appsus'
}

function getUser(){
    return loggedinUser
}

function query(filterBy)  {
    console.log('filterBy:', filterBy)
    return asyncStorageService.query(STORAGE_KEY)
        .then(mails => { 
            if(filterBy){
                const regExp = new RegExp(filterBy.search, 'i')
                mails = mails.filter(mail => regExp.test(mail.from))
            }
        return mails
    })
}

function getDefaultFilter() {
    return { search:'' }
}

function _createMails(){
    let mails = storageService.loadFromStorage(STORAGE_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Dropbox'))
        mails.push(_createMail('Google Security'))
        mails.push(_createMail('Paypal'))
        mails.push(_createMail('Interactive Brokers'))
        mails.push(_createMail('GitHub'))
        mails.push(_createMail('Facebook'))
        mails.push(_createMail('The-Open-University'))
        mails.push(_createMail('Apple'))
        mails.push(_createMail('Udemy'))
        mails.push(_createMail('LinkedIn'))
        mails.push(_createMail('YouTube'))
        mails.push(_createMail('Facebook'))
        mails.push(_createMail('The-Open-University'))
        mails.push(_createMail('Apple'))
        mails.push(_createMail('Facebook'))
        mails.push(_createMail('Amazon'))
        mails.push(_createMail('LinkedIn'))
        mails.push(_createMail('Facebook'))
        mails.push(_createMail('Udemy'))
        mails.push(_createMail('GitHub'))
        storageService.saveToStorage(STORAGE_KEY, mails)
    }
}

function get(id) {
    return asyncStorageService.get(STORAGE_KEY, id)
}

function remove(mailId) {
    console.log('mailId:', mailId)
    return asyncStorageService.remove(STORAGE_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(STORAGE_KEY, mail)
    } else {
        return asyncStorageService.post(STORAGE_KEY, mail)
    }
}

function markAsRead(mailId, isReadStatus) {
    let mails = storageService.loadFromStorage(STORAGE_KEY)
    const mail = mails.find(mail => mail.id === mailId);
    mail.isRead = isReadStatus
    return asyncStorageService.put(STORAGE_KEY, mail)
}

function markAsStar(mailId){
    let mails = storageService.loadFromStorage(STORAGE_KEY)
    const mail = mails.find(mail => mail.id === mailId )
    mail.isStar = !mail.isStar
    console.log('mail:', mail)
    return asyncStorageService.put(STORAGE_KEY,mail)
}

function getDefaultFilter() {
    return { title: '' }
}

function _createMail(from ,subject, body, sentAt) {
    return {
        id: utilService.makeId(),
        subject:utilService.makeLorem(utilService.getRandomIntInclusive(5,10)) + '-',
        body: utilService.makeLorem(utilService.getRandomIntInclusive(20,80)),
        isRead: (Math.random() > 0.4),
        isStar: (Math.random() > 0.8),
        sentAt:utilService.formatDate(Date.now()),
        removedAt: null,
        from,
        to: 'Sahar@appsus.com'
    }
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}

function saveDeletedMail(mailId) {
    let mails = storageService.loadFromStorage(STORAGE_KEY)
    const mail = mails.find(mail => mail.id === mailId);
    return asyncStorageService.post(DELETED_MAILS_KEY, mail)
}

function getDeletedMails(){
    const mails = storageService.loadFromStorage(DELETED_MAILS_KEY)
    console.log('mails:', mails)
    return mails
}

function getStarredMails(){
    const mails = storageService.loadFromStorage(STORAGE_KEY)
    const starredMails = mails.filter(mail => mail.isStar)
    console.log('starredMails:', starredMails)
    return starredMails
}

function sentMailFormat({subject,body,to}){
    const formattedSentMail = {
        subject,
        body,
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: 'SaharMachpud@appsus.com',
        to
    }   
    return asyncStorageService.post(SENT_MAILS_KEY, formattedSentMail)       
}

function getSentMails(){
    return storageService.loadFromStorage(SENT_MAILS_KEY)
}

function getMailsCount(){  
    return storageService.loadFromStorage(STORAGE_KEY).length
}