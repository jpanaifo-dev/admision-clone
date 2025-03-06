"use client"

import SearchProgramSelector from "./search-items-selector"
import SelectedProgramsSelector from "./selected-items-selector"

export default function DualSelector() {

    return (
        <div className="w-full pb-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <SearchProgramSelector />
                <SelectedProgramsSelector />
            </div>
        </div>
    )
}
