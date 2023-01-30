<template>
  <nuxt-link
    v-if="permitted"
    :to="to"
    :class="[mobile ? 'text-base' : 'text-sm', sidebarItemParentClass]"
    class="group flex items-center px-2 py-3 font-medium rounded-md"
    @click.native="toggleSidebar('close')"
  >
    <common-fa-icon
      :icon="icon"
      class="mr-4 flex-shrink-0 text-gray-500"
      :class="icon === 'circle' ? 'h-2 w-2' : 'h-5 w-5'"
    />
    {{ title }}
  </nuxt-link>
</template>

<script>
import SidebarItemMixin from '@/mixins/SidebarItemMixin'
import SidebarMixin from '@/mixins/SidebarMixin'

export default {
  mixins: [SidebarMixin, SidebarItemMixin],
}
</script>
