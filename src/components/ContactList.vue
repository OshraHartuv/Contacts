<template>
  <div class="contact-list">
    <div v-for="contact in contacts" :key="contact._id">
      <ContactPreview :contact="contact" />
    </div>
  </div>
</template>

<script>
import ContactPreview from "./ContactPreview.vue";

export default {
  props: {
    contacts: Array
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