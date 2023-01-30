<template>
  <button
    v-bind="$attrs"
    class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    v-on="$listeners"
  >
    <span class="sr-only">{{ altText }}</span>
    <img
      class="h-8 w-8 rounded-full object-cover"
      src="https://pics.me.me/thumb_99-rolf-ed-edd-n-eddy-fandom-powered-by-wikia-52042210.png"
      alt=""
    />
  </button>
</template>

<script>
import LayoutButtonsMixin from '~/mixins/LayoutButtonsMixin'

export default {
  mixins: [LayoutButtonsMixin],
}
</script>
