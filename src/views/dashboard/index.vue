<template>
  <div class="dashboard-container">
    <nav-dashboard />
    <!-- <component :is="currentRole" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import navDashboard from './nav'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard, navDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
