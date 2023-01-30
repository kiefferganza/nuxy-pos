<template>
  <!-- TODO: Implement real breadcrumbs haha (get routes then display hierarchy) -->
  <nav class="flex">
    <ol class="flex items-center space-x-4 md:px-6 pt-6">
      <li>
        <a
          href="#"
          class="flex pb-1 ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <fa-icon
            icon="home"
            class="flex-shrink-0 h-5 w-5 text-gray-400 text-xs hover:text-gray-700"
          />
        </a>
      </li>
      <breadcrumb-item />
    </ol>
  </nav>
</template>

<script>
import BreadcrumbItem from './components/BreadcrumbItem'
import FaIcon from '~/components/Common/FaIcon'
export default {
  components: {
    FaIcon,
    BreadcrumbItem,
  },
}
</script>
