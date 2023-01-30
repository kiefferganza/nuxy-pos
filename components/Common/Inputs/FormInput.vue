<template>
  <input
    :class="{ 'w-full': block }"
    :type="type"
    :value="value"
    class="form-input form-input__primary"
    v-bind="$attrs"
    @paste="onPaste"
    v-on="inputListeners"
    @keypress="isNumber($event)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputListeners() {
      /*
       * Simplified native input workaround for auto
       * binding issue for Vue (sauce: https://github.com/vuejs/vue/issues/7914#issuecomment-381500346)
       */
      return {
        ...this.$listeners,
        input: (e) => this.$emit('input', e.target.value),
      }
    },
  },
  methods: {
    isNumber(evt) {
      if (this.type === 'number') {
        evt = evt || window.event
        const charCode = evt.which ? evt.which : evt.keyCode
        if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
        ) {
          evt.preventDefault()
        } else {
          return true
        }
      }
    },
    /**
     * Prevent pasting random elements on inputs, this is for you, you copy-pasting sickos
     * @param evt
     * @returns {boolean|*}
     */
    onPaste(evt) {
      if (this.type === 'number') {
        const data = evt.clipboardData.getData('Text')
        if (!isNaN(data)) {
          if (parseFloat(data) > 0) {
            return true
          }
          return evt.preventDefault()
        }
        return evt.preventDefault()
      }
      return true
    },
  },
}
</script>
