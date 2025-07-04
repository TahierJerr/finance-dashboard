"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function parseDate(dateString: string): Date | undefined {
    if (!dateString) return undefined;
    
    // Handle both DD-MM-YYYY and DD/MM/YYYY formats
    const parts = dateString.split(/[-\/]/);
    if (parts.length !== 3) return undefined;
    
    const [day, month, year] = parts.map(Number);
    if (!day || !month || !year) return undefined;
    
    // Create date with explicit year, month (0-based), day
    const date = new Date(year, month - 1, day);
    
    // Validate the date
    if (isNaN(date.getTime())) return undefined;
    
    return date;
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

// ... existing imports ...
interface DateInputProps {
    value: Date | undefined
    onChange: (date: Date | undefined) => void
    error?: string
}

export function DateInput({ value, onChange, error }: DateInputProps) {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(value)
        
        React.useEffect(() => {
            setMonth(value)
        }, [value])
        
        return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                Date
            </Label>
            <div className="relative flex gap-2">
                <Input
                id="date"
                value={value ? formatDate(value) : ""}
                placeholder="DD-MM-YYYY"
                className="bg-background pr-10"
                onChange={e => {
                    const date = parseDate(e.target.value);
                    if (date) {
                        onChange(date);
                    } else {
                        onChange(undefined);
                    }
                }}
                onKeyDown={e => {
                    if (e.key === "ArrowDown") {
                        e.preventDefault()
                        setOpen(true)
                    }
                }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        id="date-picker"
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                        <CalendarIcon className="size-3.5" />
                        <span className="sr-only">Select date</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="end"
                alignOffset={-8}
                sideOffset={10}
                >
                <Calendar
                mode="single"
                selected={value}
                captionLayout="dropdown"
                month={month}
                
                onMonthChange={setMonth}
                onSelect={date => {
                    onChange(date)
                    setOpen(false)
                }}
                />
            </PopoverContent>
        </Popover>
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
</div>
)
}