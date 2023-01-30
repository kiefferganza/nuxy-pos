<template>
  <common-wrapper title="Business Rules">
    <template #content>
      <back-office-business-rules ref="businessRules" @submit="handleSubmit" />
    </template>
  </common-wrapper>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { BUSINESS_RULES } from '@/js/constants/permissions'

export default {
  head() {
    return {
      titleTemplate: '%s - Business Rules',
    }
  },
  meta: {
    permissionURL: BUSINESS_RULES,
  },
  computed: {
    ...mapState('back-office', ['businessRulesCreate']),
  },
  mounted() {
    this.fetchBusinessRules()
  },
  methods: {
    ...mapActions('back-office', [
      'fetchBusinessRules',
      'createBusinessRules',
      'updateBusinessRules',
      'deleteBusinessRules',
    ]),
    async handleSubmit(data) {
      if (data.isUpdate) {
        if (!data.isDelete) {
          await this.updateBusinessRules(data)
        } else {
          await this.deleteBusinessRules(data)
        }
      } else {
        await this.createBusinessRules(data)
      }
      if (!this.businessRulesCreate.error) {
        this.$refs.businessRules.resetForm()
      }
    },
  },
}
</script>
