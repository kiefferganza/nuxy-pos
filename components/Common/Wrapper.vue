<template>
  <div>
    <div class="mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl tracking-tight font-semibold text-gray-900 pb-2">
        {{ title }}
      </h1>
    </div>
    <div class="mx-auto px-4 sm:px-6 md:px-8">
      <!-- Replace with your content -->
      <div class="my-4 bg-white">
        <slot name="content" />
      </div>
      <!-- /End replace -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
