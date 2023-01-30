<template>
  <div class="text-center flex flex-col flex justify-start items-center">
    <nuxt-img
      src="/empty-dashboard.webp"
      loading="lazy"
      height="300"
      width="300"
    />
    <div class="pt-4">
      <h3 class="mt-2 text-2xl font-medium text-gray-900">
        No Dashboard Available
      </h3>
      <p class="mt-1 text-sm font-light text-gray-500">
        Your assigned role does not have any available dashboard data at the
        moment
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>
