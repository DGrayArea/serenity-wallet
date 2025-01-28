import { cn } from "@/lib/utils"
type propsType = {
  className: string
}
export function Step(props: propsType) {
  const className = props.className;
  return (
    <div
      className={cn(
        "rounded-lg h-2 w-8",
        className
      )}
    >
    </div>
  )
}