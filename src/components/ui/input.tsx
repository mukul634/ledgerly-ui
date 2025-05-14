
import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isAmount?: boolean;
  step?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isAmount, step = 100, onIncrement, onDecrement, ...props }, ref) => {
    if (isAmount) {
      return (
        <div className="flex h-10 w-full rounded-md border border-input overflow-hidden">
          <button 
            type="button"
            className="flex-none w-10 flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors border-r border-input"
            onClick={onDecrement}
          >
            -
          </button>
          <input
            type="text"
            className={cn(
              "flex w-full bg-background px-3 py-2 text-base text-center ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
            ref={ref}
            {...props}
          />
          <button 
            type="button"
            className="flex-none w-10 flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors border-l border-input"
            onClick={onIncrement}
          >
            +
          </button>
        </div>
      );
    }
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
