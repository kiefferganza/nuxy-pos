<!-- Please remove this file from your project -->
<template>
  <div
    class="max-w-lg w-full bg-white rounded-lg p-5 md:p-6 shadow-md space-y-4 border border-gray-200"
  >
    <auth-heading title="Login" description="Sign in to your account" />
    <alert-component v-show="login.error" variant="danger">
      <error-message :message="login.error" />
    </alert-component>
    <alert-component v-show="login.message" variant="success">
      {{ login.message }}
    </alert-component>
    <form class="pb-2" @submit.prevent="submit">
      <div class="pb-3">
        <form-group
          label-for="username"
          label="Email or Mobile Number"
          required
        >
          <form-input
            id="mobile-number"
            v-model="username"
            type="text"
            placeholder="abc@traxiontech.com / 09123456789"
            required
            block
          />
        </form-group>
        <form-group
          class="mb-1 mt-3"
          label-for="email"
          label="Password"
          required
        >
          <form-input
            id="password"
            v-model="password"
            type="password"
            placeholder="********"
            required
            block
          />
        </form-group>
        <forgot-password-link />
      </div>
      <form-button
        :disabled="login.busy"
        :busy="login.busy"
        type="submit"
        block
        class="button button__block button__primary"
        >Login</form-button
      >
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ErrorMessage from '../../Common/ErrorMessage'
import ForgotPasswordLink from './components/ForgotPasswordLink'
import AuthHeading from '~/components/Common/Auth/AuthHeading'
import AlertComponent from '~/components/Common/AlertComponent'
import FormInput from '~/components/Common/Inputs/FormInput'
import FormGroup from '~/components/Common/FormGroup'
import FormButton from '~/components/Common/Inputs/FormButton'

export default {
  components: {
    ErrorMessage,
    AuthHeading,
    AlertComponent,
    FormGroup,
    FormInput,
    FormButton,
    ForgotPasswordLink,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapState('auth', ['login']),
  },
  methods: {
    submit() {
      this.$emit('submit', {
        username: this.username,
        password: this.password,
      })
    },
  },
}
</script>
