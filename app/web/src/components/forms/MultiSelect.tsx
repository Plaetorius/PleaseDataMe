"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/shadcn/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { Badge } from "@/components/shadcn/badge"

export type OptionType = {
  value: string
  label: string
  group?: string
}

interface MultiSelectProps {
  options: OptionType[]
  selected: string[]
  onChangeAction: (values: string[]) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
  badgeClassName?: string
}

export function MultiSelect({
  options,
  selected,
  onChangeAction,
  placeholder = "Select options",
  emptyMessage = "No options found.",
  className,
  badgeClassName,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (value: string) => {
    onChangeAction(selected.filter((item) => item !== value))
  }

  // Group options by their group property
  const groupedOptions = options.reduce(
    (acc, option) => {
      const group = option.group || "Options"
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(option)
      return acc
    },
    {} as Record<string, OptionType[]>,
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("min-h-10 h-auto w-full justify-between px-3 py-2", className)}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
            {selected.map((value) => {
              const option = options.find((opt) => opt.value === value)
              return (
                <Badge
                  key={value}
                  variant="secondary"
                  className={cn("bg-secondary/50 text-secondary-foreground mr-1 mb-1 flex items-center", badgeClassName)}
                >
                  <span className="mr-1">{option?.label}</span>
                  <span
                    role="button"
                    className="cursor-pointer h-5 w-5 p-0 ml-1 hover:bg-secondary/80 rounded-full inline-flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUnselect(value)
                    }}
                    aria-label={`Remove ${option?.label}`}
                  >
                    <X className="h-3 w-3" />
                  </span>
                </Badge>
              )
            })}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {Object.entries(groupedOptions).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((option) => {
                  const isSelected = selected.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        onChangeAction(
                          isSelected ? selected.filter((item) => item !== option.value) : [...selected, option.value],
                        )
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                      {option.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

