<template>
  <section class="contact-preview">
    <div v-for="(key) in getKeys" :key="key">
      <span class="underline">{{ getKeyForDisplay(key) }}:</span>
      {{ contact[key] }}
    </div>
    <div>
      <RouterLink :to="'/edit/'+contact._id">
        <button>Edit</button>
      </RouterLink>
      <button @click="deleteContact(contact._id)">Delete</button>
    </div>
  </section>
</template>

<script>
import { utilService } from "@/services/util-service.js";
import { computed } from "vue";

export default {
  props: {
    contact: Object
  },
  emits: ["deleteContact"],
  setup(props, ctx) {
    const contact = props.contact;

    const getKeys = computed(() => {
      return Object.keys(contact).filter(k => k !== "_id");
    });

    function getKeyForDisplay(key) {
      return utilService.formatString(key);
    }

    function deleteContact(id) {
      ctx.emit("deleteContact", id);
    }

    return {
      getKeys,
      getKeyForDisplay,
      deleteContact,
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