<template>
  <div class="cursor-pointer">
    <sidebar-single-item
      v-if="!children"
      :title="title"
      :to="to"
      :icon="icon"
      :permitted="permitted"
    />
    <sidebar-nested-item
      v-else
      :title="title"
      :to="to"
      :icon="icon"
      :children="children"
    />
  </div>
</template>

<script>
import SidebarItemMixin from '@/mixins/SidebarItemMixin'
import SidebarSingleItem from '@/components/Layouts/Sidebar/components/SidebarItem/components/SidebarSingleItem'
import SidebarNestedItem from '@/components/Layouts/Sidebar/components/SidebarItem/components/SidebarNestedItem'

export default {
  components: { SidebarNestedItem, SidebarSingleItem },
  mixins: [SidebarItemMixin],
  props: {
    children: {
      type: Array,
      default: null,
    },
  },
}
</script>
