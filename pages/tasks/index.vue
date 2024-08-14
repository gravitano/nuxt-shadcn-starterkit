<script setup lang="tsx">
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import { ArrowUpDown } from 'lucide-vue-next'
import { ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import type { Task } from './schema'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { getErrorMessage, valueUpdater } from '@/lib/utils'
import { Icon, NuxtLink } from '#components'
import { Badge } from '~/components/ui/badge'
import DeleteModal from '~/components/app/delete-modal/DeleteModal.vue'
import { deleteTodo, getTodoList } from '~/api/tasks'

const columnHelper = createColumnHelper<Task>()
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const isDeleteModalOpen = ref(false)
const selectedItem = ref<Task | null>(null)
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
})
const totalItems = ref(1000)

const {
  data: tasksData,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ['tasks', pagination],
  queryFn: () => {
    return getTodoList({
      _page: pagination.value.pageIndex + 1,
      _limit: pagination.value.pageSize,
    })
  },
})

const data = computed(() => {
  return tasksData.value?.data ?? []
})

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
          || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onUpdate:checked={value => table.toggleAllPageRowsSelected(!!value)}
        ariaLabel="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onUpdate:checked={value => row.toggleSelected(!!value)}
        ariaLabel="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor('title', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          class="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          {' '}
          <ArrowUpDown class="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div class="lowercase">{row.getValue('title')}</div>,
  }),
  columnHelper.accessor('completed', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          class="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Is Completed ?
          {' '}
          <ArrowUpDown class="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Badge variant="secondary" class="whitespace-nowrap uppercase">
        {row.getValue('completed') ? 'Yes' : 'No'}
      </Badge>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div class="flex items-center">
          <Button variant="ghost" class="px-2" asChild>
            <NuxtLink to={`/tasks/edit/${row.original.id}`}>
              <Icon name="lucide:edit" size="20" class="text-icon" />
            </NuxtLink>
          </Button>

          <Button
            variant="ghost"
            class="px-2"
            onClick={() => {
              selectedItem.value = row.original
              isDeleteModalOpen.value = true
            }}
          >
            <Icon name="lucide:trash-2" size="20" class="text-icon" />
          </Button>
        </div>
      )
    },
  }),
]

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue =>
    valueUpdater(updaterOrValue, rowSelection),
  manualPagination: true,
  rowCount: totalItems.value,
  onPaginationChange: (updater: any) => {
    pagination.value = updater(pagination.value)
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    columnPinning: {
      // left: ['title'],
    },
    get pagination() {
      return pagination.value
    },
  },
})

const deleteTodoMutation = useMutation({
  mutationFn: (id: number) => {
    return deleteTodo(id)
  },
  onSuccess() {
    isDeleteModalOpen.value = false
    toast.success('Success', {
      description: 'Task deleted successfully',
    })
    refetch()
  },
  onError(error) {
    toast.error(getErrorMessage(error))
  },
})

function removeTask() {
  if (!selectedItem.value)
    return

  deleteTodoMutation.mutate(selectedItem.value.id)
}
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row justify-between items-center gap-4">
      <div class="space-y-2">
        <CardTitle>Tasks</CardTitle>
        <p class="text-tertiary dark:text-slate-500 text-sm">
          Kelola tasking
        </p>
      </div>
      <Button as-child>
        <NuxtLink to="/tasks/create">
          Tambah
          <Icon name="ph:plus" size="20" class="ml-2" />
        </NuxtLink>
      </Button>
    </CardHeader>
    <Separator />
    <CardContent>
      <DataTable :table :is-loading :total-items :pagination :columns />
    </CardContent>

    <DeleteModal
      v-model="isDeleteModalOpen"
      title="Hapus Task"
      message="Apakah Anda yakin ingin menghapus task ini?"
      :loading="deleteTodoMutation.isPending.value"
      @submit="removeTask"
    />
  </Card>
</template>
