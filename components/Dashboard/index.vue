<template>
  <div>
    <maker-checker-stats v-if="user.roleId === 1 || user.roleId === 2" />
    <dashboard-empty-state v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DashboardEmptyState from './components/DashboardEmptyState.vue'
import MakerCheckerStats from '@/components/Dashboard/components/MakerCheckerStats'
export default {
  name: 'Index',
  components: { MakerCheckerStats, DashboardEmptyState },
  computed: {
    ...mapState('auth', ['user']),
  },
}
</script>
