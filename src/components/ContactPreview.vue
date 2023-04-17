<template>
  <section class="contact-preview">
    <div v-for="(key) in getKeys" :key="key">
      <span class="underline">{{ getKeyForDisplay(key) }}:</span>
      {{ contact[key] }}
    </div>
    <button>
      <RouterLink :to="'/edit/'+contact._id">Edit</RouterLink>
    </button>
    <button @click="deleteContact(contact._id)">Delete</button>
  </section>
</template>

<script>
import { utilService } from "@/services/util-service.js";
import { computed } from "vue";

export default {
  props: {
    contact: Object
  },
  setup(props) {
    const contact = props.contact;

    const getKeys = computed(() => {
      return Object.keys(contact).filter(k => k !== "_id");
    });

    function getKeyForDisplay(key) {
      return utilService.formatString(key);
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
      deleteContact,
      getKeys,
      getKeyForDisplay
    };
  }
};
</script>

<style>
.contact-preview {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
}

.underline {
  text-decoration: underline;
}
</style>