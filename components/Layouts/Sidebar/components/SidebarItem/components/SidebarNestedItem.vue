<template>
  <div :class="[mobile ? 'text-base' : 'text-sm']">
    <a
      v-if="!hideDropdown"
      class="group flex items-center justify-between px-2 py-2 font-medium rounded-md text-gray-600"
      @click="showChild = !showChild"
    >
      <div class="flex items-center">
        <common-fa-icon
          :icon="icon"
          class="mr-4 text-gray-500 flex-shrink-0 h-5 w-5"
        />
        {{ title }}
      </div>
      <common-fa-icon
        :icon="`chevron-${showChild ? 'down' : 'right'}`"
        class="mr-4 flex-shrink-0 h-4 w-4"
      />
    </a>
    <div v-show="showChild" class="flex-row">
      <sidebar-single-item
        v-for="(child, index) in children"
        :key="index"
        class="flex justify-start pl-8 items-center"
        :to="child.to"
        :title="child.title"
        :permitted="child.permitted"
        icon="circle"
      />
    </div>
  </div>
</template>

<script>
import SidebarItemMixin from '@/mixins/SidebarItemMixin'
import SidebarSingleItem from '@/components/Layouts/Sidebar/components/SidebarItem/components/SidebarSingleItem'

export default {
  components: { SidebarSingleItem },
  mixins: [SidebarItemMixin],
  props: {
    children: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      showChild: false,
    }
  },
  computed: {
    hideDropdown() {
      return this.children.every(({ permitted }) => !permitted)
    },
  },
  watch: {
    $route: {
      handler(e) {
        this.showChild = this.children.map((child) => child.to).includes(e.path)
      },
    },
  },
  mounted() {
    this.showChild = this.children
      .map((child) => child.to)
      .includes(this.$route.path)
  },
}
</script>
