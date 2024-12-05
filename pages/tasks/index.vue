<script setup lang="tsx">
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useQueryClient } from '@tanstack/vue-query'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Icon, NuxtLink } from '#components'
import { Badge } from '~/components/ui/badge'
import DeleteModal from '~/components/app/delete-modal/DeleteModal.vue'
import TableAction from '~/components/app/TableAction'
import { useTodos } from '~/queries/todos'
import type { Todo } from '~/types/todos'
import DataTableHeader from '~/components/app/data-table/DataTableHeader.vue'

const sorting = ref<SortingState>([])
const isDialogDeleteOpen = ref(false)
const selectedItem = ref<Todo | null>(null)
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
})
const totalItems = ref(100)

const {
  data,
  isLoading,
} = useTodos({
  queryKey: [pagination],
  params: computed(() => {
    return {
      _page: pagination.value.pageIndex + 1,
      _limit: pagination.value.pageSize,
      _sort: sorting.value.map((sort) => {
        return `${sort.id}:${sort.desc ? 'desc' : 'asc'}`
      }),
    }
  }),
})

const columns: ColumnDef<Todo>[] = [
  {
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
  },
  {
    id: 'title',
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          label="Title"
          onClick={() => {
            sorting.value = [{ id: 'title', desc: column.getIsSorted() === 'asc' }]
          }}
        />
      )
    },
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
  {
    id: 'completed',
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          label="Completed?"
          onClick={() => {
            sorting.value = [{ id: 'completed', desc: column.getIsSorted() === 'asc' }]
          }}
        />
      )
    },
    cell: ({ row }) => (
      <Badge variant="secondary" class="whitespace-nowrap uppercase">
        {row.getValue('completed') ? 'Yes' : 'No'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <TableAction
          viewLink={`/tasks/view/${row.original.id}`}
          editLink={`/tasks/edit/${row.original.id}`}
          onDelete={() => {
            selectedItem.value = row.original
            isDialogDeleteOpen.value = true
          }}
        />
      )
    },
  },
]

const deleteMutation = useDeleteTodo()
const queryClient = useQueryClient()

const { removeItem } = useDeleteMutation<Todo>({
  selectedItem,
  mutation: deleteMutation,
  onSuccess: () => {
    toast.success('Task berhasil dihapus')
    queryClient.invalidateQueries({
      queryKey: ['todos'],
    })
    isDialogDeleteOpen.value = false
    selectedItem.value = null
  },
})
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
          <Icon
            name="ph:plus"
            size="20"
            class="ml-2"
          />
        </NuxtLink>
      </Button>
    </CardHeader>
    <Separator />
    <CardContent class="pt-6">
      <DataTable
        v-model:pagination="pagination"
        v-model:sorting="sorting"
        :data
        :columns
        :total-items
        :is-loading
      />
    </CardContent>

    <DeleteModal
      v-model="isDialogDeleteOpen"
      title="Hapus Task"
      message="Apakah Anda yakin ingin menghapus task ini?"
      :loading="deleteMutation.isPending.value"
      @submit="removeItem"
    />

    <!-- <pre wrap>{{ { data } }}</pre> -->
  </Card>
</template>
