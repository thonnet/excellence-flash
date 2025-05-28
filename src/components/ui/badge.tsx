
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ExcellencesIcon } from '../icons/IconLibrary'

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        manifestee: "border-transparent bg-green-100 text-green-800",
        principe: "border-transparent bg-blue-100 text-blue-800", 
        quete: "border-transparent bg-orange-100 text-orange-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showIcon?: boolean;
  category?: 'manifestee' | 'principe' | 'quete';
}

function Badge({ className, variant, showIcon = false, category, ...props }: BadgeProps) {
  const getCategoryIconClass = (cat?: string) => {
    if (cat === 'manifestee') return 'category-icon--manifestee';
    if (cat === 'principe') return 'category-icon--principe';
    if (cat === 'quete') return 'category-icon--quete';
    return 'category-icon--manifestee';
  };

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {showIcon && category && (
        <ExcellencesIcon className={`category-icon ${getCategoryIconClass(category)} mr-1`} size={12} />
      )}
      {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
