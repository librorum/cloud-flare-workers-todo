c<template>
  <q-page class="flex flex-center column">
    <div class="">
      <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px">
    </div>
    <div class="">
      test
      <pre>{{ check_in_result }}</pre>
    </div>
  </q-page>
</template>

<script setup>
import { $api } from 'boot/axios'
import { ref, onMounted } from 'vue'

const check_in_result = ref({})
onMounted(async () => {
  check_in_result.value = await $api.checkIn()
})
</script>
