<template>
  <div class="contact-app">
    <RouterLink to="/edit">Create contact</RouterLink>
    <ContactFilter @setFilter="setFilter" />
    <ContactList :contacts="contactsForDisplay"  @deleteContact="deleteContact" />
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import { contactService } from "@/services/contact-service.js";

import ContactFilter from "../components/ContactFilter.vue";
import ContactList from "../components/ContactList.vue";

export default {
  async setup() {
    const contacts = reactive(await contactService.getContacts());
    const filterBy = ref("");

    const contactsForDisplay = computed(() => {
      if (!filterBy.value) return contacts;
      else return filter();
    });

    function filter() {
      const term = filterBy.value.toLocaleLowerCase();
      return contacts.filter(c => {
        return (
          c.name.toLocaleLowerCase().includes(term) ||
          c.phone.toLocaleLowerCase().includes(term) ||
          c.email.toLocaleLowerCase().includes(term)
        );
      });
    }

    function setFilter(filter) {
      filterBy.value = filter;
    }

    async function deleteContact(id) {
      try {
        await contactService.deleteContact(id);
        const idx = contacts.findIndex(c => c._id === id);
        if (idx !== -1) contacts.splice(idx, 1);
        else throw new Error("No matching idx");
      } catch (err) {
        console.error(`Error while deleting contact => ${err.message}`);
      }
    }

    return {
      setFilter,
      contactsForDisplay,
      deleteContact
    };
  },
  components: { ContactFilter, ContactList }
};
</script>

<style>
.contact-app{
  display:flex;
  flex-direction: column;
  gap: 15px;
}
</style>

