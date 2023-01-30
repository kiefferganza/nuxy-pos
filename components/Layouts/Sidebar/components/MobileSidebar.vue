<template>
  <div
    class="fixed inset-0 flex z-40 lg:hidden"
    role="dialog"
    aria-modal="true"
    :style="!showSidebar ? 'display: none' : ''"
  >
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
    <div
      class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white animate__animated animate__slideInLeft"
    >
      <div class="absolute top-0 right-0 -mr-12 pt-2">
        <close-button
          type="button"
          alt-text="Close Sidebar"
          @click="toggleSidebar('close')"
        />
      </div>

      <sidebar-heading />
      <div class="mt-5 flex-1 h-0 overflow-y-auto">
        <nav class="px-2 space-y-1">
          <sidebar-item
            v-for="(
              { title, icon, to, children, permitted }, index
            ) in sidebarItems"
            :key="index"
            :title="title"
            :icon="icon"
            :to="to"
            :children="children"
            :permitted="permitted"
            mobile
          />
        </nav>
      </div>
    </div>

    <div class="flex-shrink-0 w-14" aria-hidden="true">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import SidebarHeading from './SidebarHeading'
import CloseButton from '~/components/Common/Inputs/CloseButton'
import SidebarMixin from '~/mixins/SidebarMixin'

export default {
  components: { SidebarItem, CloseButton, SidebarHeading },
  mixins: [SidebarMixin],
  props: {
    sidebarItems: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
