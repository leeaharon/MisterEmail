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

async function query(filterBy) {
    const emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy
        maxBatteryStatus = maxBatteryStatus || Infinity
        minBatteryStatus = minBatteryStatus || 0
        robots = robots.filter(robot => robot.type.toLowerCase().includes(type.toLowerCase()) && robot.model.toLowerCase().includes(model.toLowerCase())
            && (robot.batteryStatus < maxBatteryStatus)
            && robot.batteryStatus > minBatteryStatus)
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(robotToSave) {
    if (robotToSave.id) {
        return storageService.put(STORAGE_KEY, robotToSave)
    } else {
        robotToSave.isOn = false
        return storageService.post(STORAGE_KEY, robotToSave)
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
                id: 'e142',
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




