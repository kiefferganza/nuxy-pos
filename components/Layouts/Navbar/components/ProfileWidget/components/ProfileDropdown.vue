<template>
  <div
    :style="!show ? 'display: none' : ''"
    class="animate__animated animate__fadeIn origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    role="menu"
  >
    <button
      v-for="(item, index) in items"
      :key="index"
      class="block px-4 font-medium py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
      @click="handleCallback(item.callback)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCallback(fn) {
      // TODO: Add handler for router push prop
      fn()
    },
  },
}
</script>
