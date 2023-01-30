<template>
  <div class="relative flex items-center">
    <div class="flex items-center h-5">
      <input
        type="checkbox"
        class="form-checkbox"
        :class="variantClass"
        :value="value"
        :checked="value"
        v-bind="$attrs"
        @input="(e) => $emit('input', e.target.checked)"
      />
    </div>
    <div class="ml-3 text-sm">
      <label for="comments" class="font-medium text-gray-900">{{
        title
      }}</label>
      <p v-if="description" class="text-gray-500">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Boolean, String],
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    description: {
      type: String,
      default: '',
    },
  },
  computed: {
    variantClass() {
      switch (this.variant) {
        case 'primary':
          return 'form-checkbox__primary'
        default:
          return 'form-checkbox__primary'
      }
    },
  },
}
</script>
