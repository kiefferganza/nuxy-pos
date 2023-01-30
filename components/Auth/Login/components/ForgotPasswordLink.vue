<template>
  <div class="flex justify-center md:justify-end pt-1 font-medium text-sm">
    Forgot your &nbsp;
    <nuxt-link
      class="link link__primary"
      :to="`/reset-credentials?type=${password}`"
      >password&nbsp;</nuxt-link
    >
    or &nbsp;
    <nuxt-link class="link__primary" :to="`/reset-credentials?type=${pin}`"
      >PIN code</nuxt-link
    >&nbsp; ?
  </div>
</template>

<script>
import { PASSWORD, PIN } from '~/js/constants/reset-credential-types'

export default {
  data() {
    return {
      pin: PIN,
      password: PASSWORD,
    }
  },
}
</script>
