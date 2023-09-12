import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    _createEmails
    
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
    if(filterBy.isRead !== null){
        emails = emails.filter(email=> email.isRead ===filterBy.isRead)
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}


function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        robotToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultFilter() {
    return {
        subject: ''
        
    }
}

function createEmail(subject = '', body = '', isRed = false, isStarred = false, sentAt = '', removedAt = null, //for later use
    from = '', to = '') {
    return {
        subject,
        body,
        isRed,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
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
                to: 'user@appsus.com'
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
                to: 'user@appsus.com'
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
                to: 'user@appsus.com'
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




