import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        'default': 'bg-primary text-primary-foreground hover:bg-primary/90',
        'destructive':
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        'outline':
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'secondary':
          'bg-secondary text-secondary-foreground border border-gray-300',
        'ghost': 'hover:bg-accent hover:text-accent-foreground',
        'link': 'text-primary underline-offset-4 hover:underline',
        'yellow': 'bg-yellow-500 text-white',
        'green': 'bg-green-500 text-white',
        'soft-blue': 'bg-blue-100 text-blue-700',
        'icon': 'hover:bg-accent hover:text-accent-foreground w-10 h-10',
        'orange': 'bg-orange-400 hover:bg-orange-400/90 text-white',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      shadow: {
        default: 'shadow-default',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shadow: 'none',
    },
    compoundVariants: [
      {
        variant: 'icon',
        class: 'p-0',
      },
    ],
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
