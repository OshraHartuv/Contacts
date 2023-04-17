<template>
  <div class="contact-list">
    <div v-for="contact in contacts" :key="contact._id">
      <ContactPreview :contact="contact" @deleteContact="deleteContact" />
    </div>
  </div>
</template>

<script>
import ContactPreview from "./ContactPreview.vue";

export default {
  props: {
    contacts: Array
  },
  emits: ["deleteContact"],
  setup(props, ctx) {
    function deleteContact(id) {
      ctx.emit("deleteContact", id);
    }

    return { deleteContact };
  },
  components: { ContactPreview }
};
</script>

<style>
.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>