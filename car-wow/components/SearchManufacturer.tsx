"use client";

import { Combobox, ComboboxButton,ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react"
import { SearchManufacturerProps } from "@/types"
import { manufacturers } from "@/constants";
import { useState } from "react";
import Image from "next/image";

const SearchManufacturer = ({manufacturer , setManufacturer} : SearchManufacturerProps) => {
    const [query, setQuery] = useState("");
    const filteredManufacturers = 
    query === "" 
        ? manufacturers 
        :
        manufacturers.filter((manufacturer) => (
            manufacturer.toLowerCase()
            .replace(/\s/g, "")
            .includes(query.toLowerCase().replace(/\s/g, ""))
        ))


  return (
    <div className="search-manufacturer">
        <Combobox value={manufacturer} onChange={setManufacturer} onClose={() => setQuery("")}>
            <div className="relative w-full">
                <ComboboxButton className="absolute top-[14px] left-4">
                    <Image
                        src="/car-logo.svg"
                        width={20}
                        height={20}
                        alt="Car Logo" 
                    />
                </ComboboxButton >
                <ComboboxInput
                    className="search-manufacturer__input"
                    placeholder="Volkswagen"
                    aria-label="Search Manufacturer"
                    displayValue={(manufacturer: string) => manufacturer}
                    onChange={(e) => setQuery(e.target.value)}
                >
            </ComboboxInput>
                <ComboboxOptions
                    transition
                    className="transition ease-in duration-100 opacity-100 empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {filteredManufacturers.map((manufacturer: string) => (
                        <ComboboxOption 
                            key={manufacturer}
                            className="relative search-manufacturer__option data-[focus]:bg-primary-blue data-[focus]:text-white"
                            value={manufacturer}>
                                {({ selected, focus}) =>(
                                    <>
                                        <span
                                            className={`block truncate 
                                                ${selected ? 'font-medium' : 'font-normal'}
                                                `}>
                                                {manufacturer}
                                        </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 right-0 flex items-center pl-3
                                                        ${focus ? 'text-white'
                                                            : 'text-teal-600'
                                                        }`}
                                                >
                                                </span>
                                            ): null}                                        
                                    </>
                                    )}
                        </ComboboxOption>
                    )
                        )

                    }
                </ComboboxOptions>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer