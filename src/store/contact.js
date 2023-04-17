import { defineStore } from 'pinia'
import { contactService } from '@/services/contact-service.js'

export const useContactStore = defineStore('contact', {
    state: () => {
        return {
            contacts: [],
            filterBy: '',
        }
    },
    getters: {
        contactsForDisplay: (state) => {
            const regex = new RegExp(state.filterBy, 'i')
            return state.contacts?.filter(({ name, phone, email }) => regex.test(name) || regex.test(phone) || regex.test(email))
        },
    },
    actions: {
        async saveContact(contact) {
            try {
                const savedContact = await contactService.saveContact(contact)
                if (contact._id) {
                    const idx = this.contacts.findIndex((c) => c._id === contact._id)
                    this.contacts.splice(idx, 1, savedContact)
                } else this.contacts.push(savedContact)
            } catch (err) {
                console.error(`Error while saving contact => ${err.message}`)
                throw err
            }
        },
        async loadContacts() {
            try {
                const contacts = await contactService.getContacts()
                this.contacts = contacts
            } catch (err) {
                console.error(`Error while loading contacts => ${err.message}`)
                throw err
            }
        },
        async removeContact(id) {
            try {
                await contactService.deleteContact(id)
                const idx = this.contacts.findIndex((c) => c._id === id)
                if (idx !== -1) this.contacts.splice(idx, 1)
            } catch (err) {
                console.error(`Error while deleting contact => ${err.message}`)
                throw err
            }
        },
        setFilter(filter) {
            this.filterBy = filter
        },
    },
})
