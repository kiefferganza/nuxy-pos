<!-- Please remove this file from your project -->
<template>
  <div
    class="max-w-lg w-full bg-white rounded-lg p-6 shadow-md space-y-4 border border-gray-200"
  >
    <auth-heading
      title="Credentials"
      description="Set up your account's credentials"
    />
    <alert-component v-show="stageCredentialChange.error" variant="danger">
      <error-message :message="stageCredentialChange.error" />
    </alert-component>
    <form @submit.prevent="submit">
      <div class="pb-7 gap-2 flex flex-col">
        <form-group :label-for="title" :label="title">
          <form-input
            :id="title"
            v-model="input"
            block
            type="password"
            required
          />
        </form-group>
        <form-group label-for="mobile-number" :label="`Confirm ${title}`">
          <form-input
            :id="`confirm-${title}`"
            v-model="inputConfirm"
            type="password"
            required
            block
          />
        </form-group>
      </div>
      <form-button
        :disabled="stageCredentialChange.busy"
        :busy="stageCredentialChange.busy"
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
import startCase from 'lodash/startCase'

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
      input: '',
      inputConfirm: '',
    }
  },
  computed: {
    ...mapState('auth', ['stageCredentialChange', 'person']),
    title() {
      return startCase(this.$route.query.type)
    },
  },
  methods: {
    submit() {
      const payload =
        this.$route.query.type === 'password'
          ? {
              newPassword: this.input,
              newPasswordConfirm: this.inputConfirm,
            }
          : {
              newPinCode: this.input,
              newPinCodeConfirm: this.inputConfirm,
            }
      this.$emit('submit', {
        personCode: this.person.code,
        ...payload,
      })
    },
  },
}
</script>
