import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    _createEmails,
    countermails
    
}

const STORAGE_KEY = 'emails'

_createEmails()
// filterBy={subject :'' , isRead:null}
async function query(filterBy) {
    console.log("filter log",filterBy);
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy.subject) {
        let { subject=''} = filterBy
        emails = emails.filter(email => email.subject.toLowerCase().includes(subject.toLowerCase())|| 
        email.body.toLowerCase().includes(subject.toLowerCase()))
    }
    if(filterBy.folder === 'read'){
        emails = emails.filter(email=> email.isRead && !email.removedAt )
    }
    if(filterBy.folder === 'unread'){
        emails = emails.filter(email=> !email.isRead && !email.removedAt)
    }
    if(filterBy.folder === 'stars'){
        emails = emails.filter(email=> email.isStarred && !email.removedAt)
    }
    if(filterBy.folder === 'inbox'){
        emails = emails.filter(email=>( !email.removedAt && !(email.from ===loggedinUser.email))  )
       // emails = emails.filter(email=>( (!email.removedAt && email.to ===loggedinUser.email && !email.from ===loggedinUser.email )|| (!email.removedAt && email.to ===loggedinUser.email && email.from ===loggedinUser.email )))//לרשום תנאים להצגת מיילים באינבוקס
    }
    if(filterBy.folder === 'sent'){
        emails = emails.filter(email=> email.from ===loggedinUser.email) 
    }
    if(filterBy.folder === 'bin'){
        emails = emails.filter(email=> email.removedAt) 

    }
    if(filterBy.folder === 'draft'){
        emails = emails.filter(email=> email.isDraft )
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}


function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}
async function countermails()
{
    let emails=[]
    let counter
    emails=await storageService.query(STORAGE_KEY)
    const unreademails=emails.filter(email=> !email.isRead && !email.removedAt && !(email.from ===loggedinUser.email))
    counter=unreademails.length;
    if(counter===0)
    {counter=counter.toString()
    counter=''}
    return counter;


}



function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultFilter() {
    return {
        subject: ''
        
    }
}

function createEmail(subject = '', body = '', isRead = null, isStarred = false, sentAt = Date.now(), removedAt = null, //for later use
    from = 'lee@gmail.com', to = '',isDraft= null) {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to,
        isDraft
    }
}
const loggedinUser = {
    email: 'lee@gmail.com',
    fullname: 'lee Aharon'
   }
   

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [

            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null, //for later use
                from: 'momo@momo.com',
                to: 'lee@gmail.com',
                isDraft:false
            },

            {
                id: 'e102',
                subject: 'e2- Miss you!',
                body: 'e2-Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                sentAt: 2551133930594,
                removedAt: null, //for later use
                from: '2momo@momo.com',
                to: 'lee@gmail.com',
                isDraft:false

            },
            

            {
                id: 'e103',
                subject: 'e3-Miss you!',
                body: 'e3-Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                sentAt: 3551133930594,
                removedAt: null, //for later use
                from: '3momo@momo.com',
                to: 'lee@gmail.com',
                isDraft:false

            },
            {
                id: 'e104',
                subject: 'e4-Miss you!',
                body: 'e4-Would love to catch up dkfvvfdbhbhjbjbjbhjbjbbhjbhjbjvdfvdfvfdvfdvfdvfdvfdvfdvfdvfdvfdvfdvimes',
                isRead: false,
                isStarred: false,
                sentAt: 3551133930594,
                removedAt: null, //for later use
                from: '4momo@momo.com',
                to: 'lee@gmail.com',
                isDraft:false

            },
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




