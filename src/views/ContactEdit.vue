<template>
  <form class="form" @submit="saveContact">
    <label v-for="key in getKeys" :key="key">
      {{ getKeyForDisplay(key) }}:
      <input type="text" v-model="contact[key]" />
    </label>
    <button>Save</button>
    <RouterLink to="/">Back</RouterLink>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { contactService } from "@/services/contact-service.js";
import { utilService } from "@/services/util-service.js";
import { computed } from "@vue/reactivity";

export default {
  async setup() {
    const route = useRoute();
    const router = useRouter();

    const { id } = route.params;
    const contact = reactive(
      id
        ? await contactService.getContactById(id)
        : contactService.getEmptyContact()
    );

    const getKeys = computed(() => {
      return Object.keys(contact).filter(k => k !== "_id");
    });

    function getKeyForDisplay(key) {
      return utilService.formatString(key);
    }

    async function saveContact(ev) {
      ev.preventDefault();
      try {
        await contactService.saveContact(contact);
        router.push({ name: "Contact" });
      } catch (err) {
        console.error(`Error while saving contact => ${err.message}`);
      }
    }

    return { contact, saveContact, getKeyForDisplay, getKeys };
  }
};
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid black;
  padding: 20px;
  align-items: center;
}

input {
  width: 350px;
}
</style>