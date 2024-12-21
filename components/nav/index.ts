import { type VariantProps, cva } from 'class-variance-authority'

export const navVariants = cva(
  'w-full flex gap-3 items-center px-3 py-2.5 justify-center whitespace-nowrap rounded-[6px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-gray-700 hover:text-white hover:bg-primary',
        active: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type NavVariants = VariantProps<typeof navVariants>
