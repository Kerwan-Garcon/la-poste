"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectMany({ datas, ...props }) {
  return (
    <Select
      defaultValue={props.currentValue || ""}
      onValueChange={(e) => props.onChange(e)}
      {...props}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a store" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Store</SelectLabel>
          {datas.map((store, key) => (
            <SelectItem key={key} value={store.id}>
              {store.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectMany;
