"use client";
import { Combobox, ComboboxInput, Transition } from "@headlessui/react"
import { SearchManufacturerProps } from "@/types"
import { manufacturers } from "@/constants";
import { useState, Fragment } from "react";
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
        <Combobox value={manufacturer} onChange={setManufacturer}>
            {/* <div className="flex w-full search-manufacturer__input">
                <Image
                    src="/car-logo.svg"
                    width={20}
                    height={20}
                    alt="Car Logo" 
                />
               <ComboboxInput
                    className="bg-transparent ml-2"
                    placeholder="Volkswagen"
                    displayValue={(manufacturer: string) => manufacturer}
                    onChange={(e) => setQuery(e.target.value)}
                >
               </ComboboxInput>
            </div> */}
            <div className="relative w-full">
                <Combobox.Button className="absolute top-[14px] left-4">
                    <Image
                        src="/car-logo.svg"
                        width={20}
                        height={20}
                        alt="Car Logo" 
                    />
                </Combobox.Button >
                <ComboboxInput
                    className="search-manufacturer__input"
                    placeholder="Volkswagen"
                    displayValue={(manufacturer: string) => manufacturer}
                    onChange={(e) => setQuery(e.target.value)}
                >
            </ComboboxInput>
            <Transition
                as={Fragment} 
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
            >
                <Combobox.Options>
                    {
                            filteredManufacturers.map((manufacturer) => (
                                <Combobox.Option 
                                    key={manufacturer}
                                    className={({active}) =>`relative search-manufacturer__option
                                    ${active ?
                                        'bg-primary-blue text-white'
                                        : 'text-gray-900'
                                    }
                                    `}
                                    value={manufacturer}>
                                    {({ selected, active }) =>(
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
                                                        ${active ? 'text-white'
                                                            : 'text-teal-600'
                                                        }`}
                                                >
                                                </span>
                                            ): null}                                        
                                        </>
                                    )}
                                    </Combobox.Option>
                            )
                        )

                    }
                </Combobox.Options>

            </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer