<template>
  <div>
    <Header />
    <suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>Loading</template>
    </suspense>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: { Header }
};
</script>


