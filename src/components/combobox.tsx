"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  value: string;
  label: string;
};

interface Props {
  options: Option[];
  value: Option['value'] | null;
  onValueChange: (value: Option['value'] | null) => void;
  label: string;
}

export function Combobox(props: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const selectedOption = props.options.find(
    (option) => option.value === props.value
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedOption ? <>{selectedOption.label}</> : <>{props.label}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <OptionsList setOpen={setOpen} setSelection={props.onValueChange} options={props.options} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedOption ? <>{selectedOption.label}</> : <>{props.label}</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionsList setOpen={setOpen} setSelection={props.onValueChange} options={props.options} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionsList({
  setOpen,
  setSelection,
  options,
}: {
  setOpen: (open: boolean) => void;
  setSelection: (option: Option['value'] | null) => void;
  options: Option[];
}) {
  return (
    <Command>
      <CommandInput placeholder="Select Option..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={(value) => {
                setSelection(value);
                setOpen(false);
              }}
              keywords={[option.label]}
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
