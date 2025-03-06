'use client'

import { DataTable } from "@/components/tables";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { reportscolumns } from "@/modules/admin/reports/table/columns-reports";
// import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

import {
  GraduationCap,
  Search,
  Check,
  LayoutDashboard,
  SquareChartGantt,
  Filter,
  Ban
} from "lucide-react";


export const TableReports = () => {

  return (
    <main className="flex flex-col xl:flex-row gap-4 w-full">
      <section className="flex flex-col md:justify-between w-full gap-2 border-r-2 p-2">
        <h2 className="text-base font-semibold">Filtros</h2>
        <p className="text-xs">En este apartado se podrá aplicar los filtros necesarios para la informacion que se requiera.</p>
        <div className="w-full xl:w-[300px] gap-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} />
                  Programas
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Select>
                  <SelectTrigger className="flex items-center justify-between w-full px-2 py-2 text-left border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      Maestrías
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <div className="flex items-center px-2 py-2 border-b">
                        <Search size={14} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder="Buscar..."
                          className="w-full px-2 text-sm border-none focus:outline-none"
                        />
                      </div>
                      <SelectItem value="Educación">
                        <div className="flex items-center justify-between">
                          Educación
                        </div>
                      </SelectItem>
                      <SelectItem value="Derecho Canino">
                        <div className="flex items-center justify-between">
                          Derecho Canino
                        </div>
                      </SelectItem>
                      <SelectItem value="Derecho Luchon">
                        <div className="flex items-center justify-between">
                          Derecho Luchon
                          <Check size={14} className="text-blue-500" />
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="flex items-center justify-between w-full px-2 py-2 text-left border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      Doctorado
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <div className="flex items-center px-2 py-2 border-b">
                        <Search size={14} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder="Buscar..."
                          className="w-full px-2 text-sm border-none focus:outline-none"
                        />
                      </div>
                      <SelectItem value="Educación">
                        <div className="flex items-center justify-between">
                          Educación
                        </div>
                      </SelectItem>
                      <SelectItem value="Derecho Canino">
                        <div className="flex items-center justify-between">
                          Derecho Canino
                        </div>
                      </SelectItem>
                      <SelectItem value="Derecho Luchon">
                        <div className="flex items-center justify-between">
                          Derecho Luchon
                          <Check size={14} className="text-blue-500" />
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <SquareChartGantt size={18} />
                  Periodos
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Select>
                  <SelectTrigger className="flex items-center justify-between w-full px-2 py-2 text-left border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      Fechas
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <div className="flex items-center px-2 py-2 border-b">
                        <Search size={14} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder="Buscar..."
                          className="w-full px-2 text-sm border-none focus:outline-none"
                        />
                      </div>
                      <SelectItem value="Educación">
                        <div className="flex items-center justify-between">
                          Periodo 2024
                        </div>
                      </SelectItem>
                      <SelectItem value="Derecho Canino">
                        <div className="flex items-center justify-between">
                          Periodo 2023
                        </div>
                      </SelectItem>
                      <SelectItem value="Derecho Luchon">
                        <div className="flex items-center justify-between">
                          Periodo 2022
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="flex items-center justify-between w-full px-2 py-2 text-left border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      Estados
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Educación">
                        <div className="flex items-center justify-between">
                          Activo
                        </div>
                      </SelectItem>
                      <SelectItem value="Derecho Canino">
                        <div className="flex items-center justify-between">
                          Desactivado
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <section className="flex gap-4 mt-4">
          <Button
            variant={'default'}
            className="bg-primary-700 text-white"
          >
            <Filter className="h-4 w-4" />
            Aplicar
          </Button>
          <Button variant="secondary">
            <Ban className="h-4 w-4" />
            Borrar filtros
          </Button>
        </section>
      </section>
      <DataTable
        columns={reportscolumns}
        data={[]} // Provide an empty array or the actual data here
        // onSelectionChange={handleSelectionChange}
        hasPagination={true}
      // paginationProps={{
      //   page: page,
      //   count: tickets.count,
      //   onPageChange: (page) => {
      //     setPage(page);
      //   },
      //   pageSize: tickets.results.length,
      //   onPageSizeChange: () => {
      //     getTickets({ page: page });
      //   },
      // }} 
      />
    </main>
  );
};