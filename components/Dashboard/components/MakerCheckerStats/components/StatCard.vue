<template>
  <div :class="wrapperClass" @click="$router.push(to)">
    <div :class="{ 'animate-pulse': loading }">
      <div class="flex gap-4 mb-8 items-center">
        <div
          v-if="loading"
          :class="loadingColor"
          class="h-14 w-14 rounded-lg"
        ></div>
        <span v-else :class="iconClass">
          <fa-icon :icon="icon" class="h-6 w-6" />
        </span>
        <div
          v-if="loading"
          :class="loadingColor"
          class="h-10 w-16 rounded"
        ></div>
        <span v-else :class="qtyClass">{{ qty }}</span>
      </div>
      <h3 class="text-lg font-medium">
        <span class="cursor-pointer focus:outline-none text-base">
          <!-- Extend touch target to entire panel -->
          <div
            v-if="loading"
            :class="loadingColor"
            class="h-4 rounded w-1/2"
          ></div>
          <span class="absolute inset-0" aria-hidden="true"></span>
          <span v-if="!loading">{{ title }}</span>
        </span>
      </h3>
      <div v-if="loading" class="mt-2">
        <div :class="loadingColor" class="h-4 rounded mb-2"></div>
        <div :class="loadingColor" class="h-4 rounded"></div>
      </div>
      <p v-else class="mt-2 text-sm text-gray-500">
        {{ description }}
      </p>
    </div>
    <span :class="arrowIconClass" aria-hidden="true">
      <fa-icon icon="arrow-up-right-from-square" class="h-6 w-6" />
    </span>
  </div>
</template>

<script>
import FaIcon from '@/components/Common/FaIcon'
export default {
  components: { FaIcon },
  props: {
    qty: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: 'green',
    },
    to: {
      type: String,
      default: '/',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * Colors of color prop are based on the tailwind colors
     * @returns {string}
     */
    wrapperClass() {
      return `stat-card stat-card__${this.color}`
    },
    iconClass() {
      return `stat-icon stat-icon__${this.color}`
    },
    qtyClass() {
      return `stat-qty-text stat-qty-text__${this.color}`
    },
    arrowIconClass() {
      return `stat-arrow-icon stat-arrow-icon__${this.color}`
    },
    loadingColor() {
      return `stat-loading stat-loading__${this.color}`
    },
  },
}
</script>
