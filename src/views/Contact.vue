<template>
  <div class="contact-app" v-if="contactsForDisplay">
    <RouterLink to="/edit">Create contact</RouterLink>
    <ContactFilter @setFilter="setFilter" />
    <ContactList :contacts="contactsForDisplay" @deleteContact="deleteContact" />
  </div>
</template>

<script>
import ContactFilter from "../components/ContactFilter.vue";
import ContactList from "../components/ContactList.vue";
import { useContactStore } from "../store/contact";
import { storeToRefs } from "pinia";

export default {
  async setup() {
    const contactStore = useContactStore();
    const { contactsForDisplay } = storeToRefs(contactStore);

    function setFilter(filter) {
      contactStore.setFilter(filter);
    }

    async function deleteContact(id) {
      try {
        await contactStore.removeContact(id);
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
.contact-app {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>

