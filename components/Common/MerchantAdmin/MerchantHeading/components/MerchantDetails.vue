<template>
  <div class="py-3.5 xl:py-0 xl:w-1/3 xl:flex-none">
    <div
      class="flex items-center max-w-xs mx-auto px-4 xl:max-w-none xl:px-4 xl:px-8"
    >
      <fa-icon
        v-if="icon"
        :icon="icon"
        class="flex-shrink-0 h-7 w-7 text-blue-500"
      />
      <div
        class="ml-4 flex-auto flex text-center lg:text-left flex-col-reverse"
      >
        <h3 class="font-medium text-gray-900 text-sm">
          {{ description }}
        </h3>
        <p class="text-sm text-gray-500">{{ title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import FaIcon from '@/components/Common/FaIcon'
export default {
  components: { FaIcon },
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
