<template>
  <div>
    <mobile-sidebar :sidebar-items="sidebarItems" />
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex md:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-col flex-grow border-r shadow-lg border-gray-200 pt-4 bg-white overflow-y-auto"
      >
        <sidebar-heading />
        <div class="mt-5 flex-grow flex flex-col">
          <nav v-if="permissions" class="flex-1 px-2 pb-4 space-y-1">
            <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
            <sidebar-item
              v-for="(
                { title, icon, to, children, permitted }, index
              ) in sidebarItems"
              :key="index"
              :title="title"
              :icon="icon"
              :to="to"
              :permitted="permitted"
              :children="children"
            />
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MobileSidebar from './components/MobileSidebar'
import SidebarItem from './components/SidebarItem'
import SidebarHeading from './components/SidebarHeading'
import { SIDEBAR_ITEMS } from '~/js/constants/sidebar-items'

export default {
  components: {
    MobileSidebar,
    SidebarItem,
    SidebarHeading,
  },
  computed: {
    ...mapState('auth', ['permissions']),
    sidebarItems() {
      return SIDEBAR_ITEMS.map((item) => {
        if (item.children) {
          return {
            ...item,
            children: item.children.map((child) => {
              return {
                ...child,
                permitted: this.hasPermission(child.permissionURL),
              }
            }),
          }
        }
        return {
          ...item,
          permitted: this.hasPermission(item.permissionURL),
        }
      })
    },
  },
  methods: {
    hasPermission(permission) {
      const matchedPermission = this.permissions.find(
        ({ URL }) => URL === permission
      )
      return matchedPermission ? matchedPermission.Permission === 1 : false
    },
  },
}
</script>
