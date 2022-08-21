<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { getAuth } from '@firebase/auth';
import { defineComponent } from 'vue'
import {auth} from '@/firebase'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
  created() {
    console.log(auth.currentUser)
  }
})
</script>
