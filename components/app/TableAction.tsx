import { EyeIcon, Pencil02Icon, Trash01Icon } from '@morphemeicons/vue/untitled'
import { Button } from '../ui/button'
import { NuxtLink } from '#components'

export interface TableActionProps {
  viewLink?: string
  editLink?: string
  onDelete?: () => void
}

// functional component
export default function TableAction({
  viewLink,
  editLink,
  onDelete,
}: TableActionProps,
) {
  return (
    <div class="flex items-center gap-1">
      {viewLink && (
        <Button variant="ghost" class="px-2" asChild>
          <NuxtLink to={viewLink}>
            <EyeIcon class="size-5" />
          </NuxtLink>
        </Button>
      )}

      {editLink && (
        <Button variant="ghost" class="px-2" asChild>
          <NuxtLink to={editLink}>
            <Pencil02Icon class="size-5" />
          </NuxtLink>
        </Button>
      )}

      {onDelete && (
        <Button
          variant="ghost"
          class="px-2"
          onClick={onDelete}
        >
          <Trash01Icon class="size-5" />
        </Button>
      )}
    </div>
  )
}
