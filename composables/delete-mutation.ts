import type { UseMutationReturnType } from '@tanstack/vue-query'
import type { AxiosResponse } from 'axios'
import { toast } from 'vue-sonner'
import type { MutationResult } from '~/types/general'
import type { Todo } from '~/types/todos'
import { getErrorMessage } from '~/utils/helpers'

export function useDeleteMutation<T>({
  selectedItem,
  onSuccess,
  mutation,
}: {
  selectedItem: Ref<T & { id: number | string } | null>
  onSuccess: () => void
  mutation: UseMutationReturnType<AxiosResponse<T, any>, Error, string | number, unknown, MutationResult<AxiosResponse<Todo, any>, Error, string | number, unknown>>
}) {
  function removeItem() {
    if (!selectedItem.value)
      return

    mutation.mutate(selectedItem.value.id, {
      onSuccess,
      onError(error) {
        toast.error(getErrorMessage(error))
      },
    })
  }

  return {
    removeItem,
    mutation,
  }
}
