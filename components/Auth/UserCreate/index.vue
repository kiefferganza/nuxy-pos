<!-- Please remove this file from your project -->
<template>
  <div
    class="max-w-lg w-full bg-white rounded-lg p-6 shadow-md space-y-4 border border-gray-200"
  >
    <auth-heading
      title="Credentials"
      description="Set up your account's credentials"
    />
    <alert-component v-show="userCreate.error" variant="danger">
      <error-message :message="userCreate.error" />
    </alert-component>
    <form @submit.prevent="submit">
      <div class="pb-7 gap-2 flex flex-col">
        <form-group label-for="pin" label="Pin Code">
          <form-input
            id="pin-code"
            v-model="pinCode"
            type="password"
            required
            block
          />
        </form-group>
        <form-group label-for="confirm-pin" label="Confirm Pin Code">
          <form-input
            id="confirm-pincode"
            v-model="pinCodeConfirm"
            type="password"
            required
            block
          />
        </form-group>
        <form-group label-for="password" label="Password">
          <form-input
            id="password"
            v-model="password"
            type="password"
            required
            block
          />
        </form-group>
        <form-group label-for="password-confirm" label="Confirm Password">
          <form-input
            id="confirm-password"
            v-model="passwordConfirm"
            type="password"
            required
            block
          />
        </form-group>
      </div>
      <form-button
        :disabled="userCreate.busy"
        :busy="userCreate.busy"
        type="submit"
        block
        class="button button__block button__primary"
        >Proceed</form-button
      >
    </form>
    <div class="flex flex-col md:flex-row items-center justify-center pt-6">
      <span class="text-sm">Already a member? &nbsp;</span>
      <nuxt-link to="/" class="link__primary">Log in.</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AuthHeading from '~/components/Common/Auth/AuthHeading'
import AlertComponent from '~/components/Common/AlertComponent'
import FormInput from '~/components/Common/Inputs/FormInput'
import FormGroup from '~/components/Common/FormGroup'
import FormButton from '~/components/Common/Inputs/FormButton'
import ErrorMessage from '~/components/Common/ErrorMessage'

export default {
  components: {
    ErrorMessage,
    AuthHeading,
    AlertComponent,
    FormGroup,
    FormInput,
    FormButton,
  },
  data() {
    return {
      pinCode: '',
      pinCodeConfirm: '',
      password: '',
      passwordConfirm: '',
    }
  },
  computed: {
    ...mapState('auth', ['userCreate', 'person']),
  },
  methods: {
    submit() {
      this.$emit('submit', {
        personCode: this.person.code,
        pinCode: this.pinCode,
        pinCodeConfirm: this.pinCodeConfirm,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      })
    },
  },
}
</script>
