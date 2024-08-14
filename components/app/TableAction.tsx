import { getCoreRowModel } from "@tanstack/vue-table"
import { Button } from "../ui/button"
import { NuxtLink, Icon } from "#components"

// functional component
export default function TableAction({
  row,
  onDelete,
}: {
  row: ReturnType<typeof getCoreRowModel>['row']
  onDelete: () => void
}) {
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
        onClick={onDelete}
      >
        <Icon name="lucide:trash-2" size="20" class="text-icon" />
      </Button>
    </div>
  )
}