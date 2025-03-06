"use client"

import Link from "next/link"
import SearchProgramSelector from "./search-items-selector"
import SelectedProgramsSelector from "./selected-items-selector"
import { Button } from "@/components/ui/button"

export default function DualSelector() {

    return (
        <div className="w-full pb-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <SearchProgramSelector />
                <SelectedProgramsSelector />
                <footer className="fixed bottom-0 w-full flex right-0 justify-center bg-white shadow-lg border-t-1">
                    <div className="flex justify-end py-4 gap-4 w-full px-4 md:px-8 lg:px-16 xl:px-28">
                        <Link href="#">
                            <Button variant="outline" type="button">
                                Cancelar
                            </Button>
                        </Link>
                        <Button type="submit">
                            Guardar
                        </Button>
                    </div>
                </footer>
            </div>
        </div>
    )
}

// "use client";
// import { BottomActions } from "@/components/app/bottom-actions";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import React, { useState } from "react";
// import DualListBox from "react-dual-listbox";
// import "react-dual-listbox/lib/react-dual-listbox.css";
// import { customIcons, dualListData, lang } from "./config-list-box";
// import { Label } from "@/components/ui/label";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// const formSchema = z.object({
//   promotion: z
//     .string()
//     .min(5, "La promoción debe tener al menos 5 caracteres."),
//   selectedPrograms: z
//     .array(
//       z.object({
//         plan: z.string(),
//         program: z.string(),
//       })
//     )
//     .min(1, "Debe seleccionar al menos un programa."),
// });

// type FormData = z.infer<typeof formSchema>;

// export default function DualListBoxSelector() {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       promotion: "",
//       selectedPrograms: [],
//     },
//   });

//   const [selectedPrograms, setSelectedPrograms] = useState<
//     { plan: string; program: string }[]
//   >([]);

//   const onSubmit = (data: FormData) => {
//     console.log("Datos del formulario:", data);
//     alert("Formulario enviado correctamente");
//   };

//   const handleSelectionChange = (selected: string[]) => {
//     const selectedWithPlan = selected.map((programId) => {
//       // Buscar el plan y programa correspondiente
//       for (const plan of dualListData) {
//         const program = plan.options.find(
//           (option) => option.value === programId
//         );
//         if (program) {
//           return { plan: plan.label, program: programId };
//         }
//       }
//       return { plan: "", program: programId }; // En caso de no encontrar el plan
//     });

//     setSelectedPrograms(selectedWithPlan);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <section className="space-y-4 overflow-y-auto h-[calc(100vh-10rem)]">
//           <div className="w-full flex flex-col gap-2 justify-start items-start bg-white dark:bg-gray-800 p-4">
//             <Label>Promoción:</Label>
//             <Controller
//               name="promotion"
//               control={control}
//               render={({ field }) => (
//                 <div className="w-full space-y-2">
//                   <Input
//                     {...field}
//                     placeholder="Convocatoria de ejemplo..."
//                     className="w-full h-9 rounded"
//                   />
//                   {errors.promotion && (
//                     <span className="text-red-500 text-sm">
//                       {errors.promotion.message}
//                     </span>
//                   )}
//                 </div>
//               )}
//             />
//           </div>

//           <div className="w-full bg-white dark:bg-gray-800 p-4 shadow">
//             <Controller
//               name="selectedPrograms"
//               control={control}
//               render={({ field }) => {
//                 // eslint-disable-next-line @typescript-eslint/no-unused-vars
//                 const { ref, ...rest } = field;

//                 return (
//                   <div className="w-full space-y-2">
//                     <DualListBox
//                       {...rest}
//                       icons={customIcons}
//                       options={dualListData}
//                       selected={selectedPrograms.map((item) => item.program)}
//                       onChange={(selected) => {
//                         handleSelectionChange(selected);
//                         field.onChange(
//                           selected.map((programId) => {
//                             const plan = dualListData.find((plan) =>
//                               plan.options.some(
//                                 (option) => option.value === programId
//                               )
//                             )?.label;
//                             return { plan: plan || "", program: programId };
//                           })
//                         );
//                       }}
//                       canFilter
//                       className="h-[450px] text-sm"
//                       lang={lang}
//                       showHeaderLabels
//                     />
//                     {errors.selectedPrograms && (
//                       <p className="text-red-500 text-sm">
//                         {errors.selectedPrograms.message}
//                       </p>
//                     )}
//                   </div>
//                 );
//               }}
//             />
//           </div>

//           <BottomActions
//             content={
//               <>
//                 <Button
//                   variant="outline"
//                   type="button"
//                   onClick={() => setSelectedPrograms([])}
//                 >
//                   Cancelar
//                 </Button>
//                 <Button type="submit">Guardar</Button>
//               </>
//             }
//           />
//         </section>
//       </form>
//     </>
//   );
// }
