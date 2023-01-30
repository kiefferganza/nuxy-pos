<template>
  <common-wrapper title="Dashboard">
    <template #content>
      <dashboard />
    </template>
  </common-wrapper>
</template>

<script>
import { DASHBOARD } from '@/js/constants/permissions'

export default {
  head() {
    return {
      titleTemplate: '%s - Dashboard',
    }
  },
  meta: {
    permissionURL: DASHBOARD,
  },
  mounted() {
    this.$store.dispatch('dashboard/fetchDashboardData')
  },
}
</script>
