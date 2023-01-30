<template>
  <button
    v-bind="$attrs"
    class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
    v-on="$listeners"
  >
    <span class="sr-only">{{ altText }}</span>
    <!-- Heroicon name: outline/menu-alt-2 -->
    <svg
      class="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h7"
      />
    </svg>
  </button>
</template>

<script>
import LayoutButtonsMixin from '~/mixins/LayoutButtonsMixin'

export default {
  mixins: [LayoutButtonsMixin],
}
</script>
