<template>
  <common-wrapper title="Roles and Permission">
    <template #content>
      <user-management-roles ref="rolePage" @submit="saveNewPermission" />
    </template>
  </common-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RoleMixin from '@/mixins/RoleMixin'
import { ROLES } from '@/js/constants/permissions'

export default {
  mixins: [RoleMixin],
  meta: {
    permissionURL: ROLES,
  },
  head() {
    return {
      titleTemplate: '%s - Roles Management',
    }
  },
  computed: {
    ...mapState('permissions', ['permissionUpdateError']),
  },
  mounted() {
    if (this.$store.state.permissions.permissions.length === 0) {
      this.$store.dispatch('permissions/fetchPermissions')
    }
  },
  methods: {
    ...mapActions('permissions', ['assignPermissions']),
    async saveNewPermission(data) {
      await this.assignPermissions(data)
      if (!this.permissionUpdateError) {
        this.$refs.rolePage.hideModal()
      }
    },
  },
}
</script>
