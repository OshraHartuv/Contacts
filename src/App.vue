<template>
  <div>
    <Header />
    <suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>Loading...</template>
    </suspense>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { useContactStore } from "./store/contact";

export default {
  setup() {
    const contactStore = useContactStore();
    // try {
      contactStore.loadContacts();
    // } catch (err) {
    //   console.error(`Error while loading contacts => ${err.message}`);
    // }
  },
  components: { Header }
};
</script>


