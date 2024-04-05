"use client";
import fetchGouvernmentAddress from "@/api/address-gouvernment";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

function AddressSearch({ value, setValue }) {
  const [searchResults, setSearchResults] = useState([]);
  const [display, setDisplay] = useState(true);
  const uniqueCities = new Set();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const handleSearch = async () => {
        try {
          const results = await fetchGouvernmentAddress(value);
          if (results.features.length !== 0) setSearchResults(results.features);
        } catch (error) {}
      };
      if (value && value.length >= 3 && display) handleSearch();
    }, 750);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <div className="relative w-full">
      <Input
        value={value}
        placeholder="Rentrer votre addresse, on cherchera pour vous!"
        onChange={(e) => {
          setValue(e.target.value);
          setDisplay(true);
        }}
        type="text"
      />
      <ul
        className={`${
          searchResults.length == 0 ? "hidden" : "block"
        } absolute top-12 w-full bg-white px-4 py-1 text-slate-70 divide-y-2 z-50 border border-slate-300 rounded-md shadow-lg`}
      >
        {searchResults.map((result, index) => {
          if (!uniqueCities.has(result.properties.city)) {
            uniqueCities.add(result.properties.city);
            return (
              <li
                className="py-2 px-4 hover:bg-slate-200 cursor-pointer transition-colors duration-200 ease-in-out dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:border-white/[0.2] dark:border-slate-700 border-b border-slate-300 text-slate-700"
                key={result.properties.id}
                onClick={() => {
                  setValue(() => result.properties.city);
                  setSearchResults([]);
                  setDisplay(false);
                }}
              >
                {result.properties.city}
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default AddressSearch;
