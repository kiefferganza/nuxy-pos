<template>
  <div>
    <label
      :for="labelFor"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    labelFor: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
