<template>
  <div class="flex flex-col">
    <div class="-my-2 md:-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div
          class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 mb-2 md:rounded-lg"
        >
          <table class="min-w-full table-fixed divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                  <input
                    type="checkbox"
                    :checked="value.length === permissions.length"
                    class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 sm:left-6"
                    @input="(e) => setAllPermissionStatus(e)"
                  />
                </th>
                <th
                  scope="col"
                  class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  Permission Name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  URL
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <!-- Selected: "bg-gray-50" -->
              <template
                v-if="permissions.length > 0 && !fetchRolePermissionsState"
              >
                <tr
                  v-for="{ MenuID, MenuName, URL } in paginatedItems"
                  :key="MenuID"
                  class="hover:bg-gray-100 cursor-pointer"
                  :class="{
                    'bg-blue-50 hover:bg-blue-100':
                      checkPermissionModel(MenuID),
                  }"
                >
                  <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                    <!-- Selected row marker, only show when row is selected. -->
                    <div
                      v-if="checkPermissionModel(MenuID)"
                      class="absolute inset-y-0 left-0 w-0.5 bg-blue-600"
                    ></div>

                    <input
                      type="checkbox"
                      :checked="checkPermissionModel(MenuID)"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 sm:left-6"
                      @input="
                        ({ target }) =>
                          setPermissionStatus(MenuID, target.checked)
                      "
                    />
                  </td>
                  <!-- Selected: "text-indigo-600", Not Selected: "text-gray-900" -->
                  <td
                    :class="
                      checkPermissionModel(MenuID)
                        ? 'text-blue-600'
                        : 'text-gray-900'
                    "
                    class="whitespace-nowrap py-4 pr-3 text-sm font-medium"
                  >
                    {{ MenuName }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <code class="bg-gray-700 text-white p-1.5 rounded-md">
                      {{ URL }}
                    </code>
                  </td>
                </tr>
              </template>
              <tr v-if="fetchRolePermissionsState">
                <td colspan="3" class="text-center py-8">
                  <common-fa-icon icon="spinner" class="h-12 w-12" spin />
                </td>
              </tr>
              <tr v-if="permissions.length === 0">
                <td colspan="3">
                  <empty-state
                    title="No Permissions Available"
                    description="There are no permissions available for this role at the moment."
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <pagination
      :length="permissions.length"
      :limit="10"
      :page="page"
      style="border-width: 0 !important"
      @paginate="changePage"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import EmptyState from '@/components/Common/EmptyState'
import Pagination from '@/components/Common/Table/components/Pagination'

export default {
  components: { EmptyState, Pagination },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      page: 1,
      checkAll: false,
    }
  },
  computed: {
    ...mapState('permissions', ['permissions']),
    ...mapState('roles', ['rolePermissions', 'fetchRolePermissionsState']),
    paginatedItems() {
      return this.permissions.slice((this.page - 1) * 10, this.page * 10)
    },
  },
  methods: {
    ...mapActions('roles', ['fetchRolePermissions']),
    setPermissionStatus(id, checked) {
      const perms = []
      this.value.forEach((e) => {
        perms.push(e)
      })
      if (checked) {
        perms.push({
          id,
          checked,
        })
      } else {
        const index = perms.map((y) => y.id).indexOf(id)
        if (index > -1) {
          perms.splice(index, 1)
        }
      }
      this.$emit('input', perms)
    },
    setAllPermissionStatus({ target }) {
      if (target.checked) {
        this.$emit(
          'input',
          this.permissions.map(({ MenuID }) => {
            return {
              id: MenuID,
              checked: target.checked,
            }
          })
        )
      } else {
        this.$emit('input', [])
      }
    },
    async fetchCheckedPermissions(id) {
      if (this.permissions.length > 0) {
        await this.fetchRolePermissions(id)
        await this.setCheckedPermissions()
      }
    },
    async setCheckedPermissions() {
      const preCheckedPermissions = this.rolePermissions
        .filter(({ Permission }) => Permission === 1)
        .map(({ MenuID, Permission }) => {
          return {
            id: MenuID,
            checked: Permission === 1,
          }
        })
      await this.$emit('input', preCheckedPermissions)
    },
    checkPermissionModel(id) {
      return this.value.map(({ id }) => id).includes(id)
    },
    changePage(page) {
      this.page = page
    },
  },
}
</script>
