// "use client";

// import React, { useState } from "react";
// import { Check } from "lucide-react";
// import type { Programa, ProgramaBase } from "./types";
// import { BottomActions } from "@/components/app/bottom-actions";
// import { Button } from "@/components/ui/button";
// import { IHeadquarter, IProgramPlanStudy, IStudyPlan } from "@/types";
// import { IProgramType } from "@/types/program/IProgramType";
// import { IKnowledgeArea } from "@/types/program/IKnowledgeArea";
// import { IModality } from "@/types/admission/IModality";
// import { FilterHeader } from "./filter-header";
// import { ToastCustom } from "@/components/app";
// import { toast } from "react-toastify";
// import { ProgramaDetails } from "./program-detail";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// interface IProps {
//   uuid?: string | string[] | undefined;
//   data?: IProgramPlanStudy[] | null;
//   headquarters?: IHeadquarter[] | null;
//   programsTypes?: IProgramType[] | null;
//   knowledgeArea?: IKnowledgeArea[] | null;
//   modalities?: IModality[] | null;
// }

// export const ProgramaFormSelector = (props: IProps) => {
//   const { data, headquarters, programsTypes, knowledgeArea, modalities } =
//     props;

//   const [programas, setProgramas] = useState<Programa[]>([]);
//   const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

//   const handleSubmit = (
//     programa: ProgramaBase,
//     modalidad: IModality | undefined,
//     sede: string,
//     planes: IStudyPlan[]
//   ) => {
//     const newPrograma: Programa = {
//       ...programa,
//       modalidad,
//       sede,
//       planesEstudio: planes,
//     };
//     console.log("Programa seleccionado:", newPrograma);
//     // Verificar si el programa ya está agregado
//     const exists = programas.some(
//       (p) => p.id === newPrograma.id && p.sede === newPrograma.sede
//     );

//     if (!exists) {
//       setProgramas([...programas, newPrograma]);
//     } else {
//       toast.error(
//         <ToastCustom
//           title="Programa ya seleccionado"
//           description="Por favor, seleccione otro programa."
//         />
//       );
//     }

//     setExpandedProgram(null);
//   };

//   const mappedProgramas = (data ?? []).map((programa) => ({
//     id: programa.id,
//     tipo: programa.program_type,
//     nombre: programa.name,
//     area: programa.area.map((a) => a.name).join(", "),
//     plans: programa.study_plan.map((plan) => ({
//       id: plan.id,
//       description: plan.description,
//       academic_cycles: plan.academic_cycles,
//       uuid: plan.uuid,
//       is_active: plan.is_active,
//       file: plan.file,
//       program: plan.program,
//     })),
//   }));

//   return (
//     <div className="min-h-screen bg-gray-50 space-y-4">
//       <section className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded">
//         <div className="w-full flex flex-col gap-2 justify-start items-start bg-white dark:bg-gray-800">
//           <Label>Promoción:</Label>
//           <Input
//             placeholder="Promoción de ejemplo..."
//             className="w-full h-9 rounded"
//           />
//         </div>
//         <FilterHeader
//           programsTypes={programsTypes}
//           knowledgeArea={knowledgeArea}
//         />
//       </section>

//       <section className="flex flex-col md:flex-row items-start gap-4 pb-16">
//         <div className="w-full md:w-2/3">
//           <h2 className="font-bold mb-4">Programas disponibles</h2>
//           <section className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full h-[calc(100vh-15rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-w-lg">
//             <div className="space-y-4">
//               {mappedProgramas?.map((programa) => (
//                 <div
//                   key={programa.id}
//                   className="border rounded-lg overflow-hidden"
//                 >
//                   <div
//                     className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
//                       expandedProgram === programa.id.toString()
//                         ? "bg-blue-50"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       setExpandedProgram(
//                         expandedProgram === programa.id.toString()
//                           ? null
//                           : programa.id.toString()
//                       )
//                     }
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium text-gray-900">
//                           {programa.nombre}
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           {programa.tipo.name} - {programa.area}
//                         </p>
//                       </div>
//                       <Check
//                         className={`w-5 h-5 ${
//                           expandedProgram === programa.id.toString()
//                             ? "text-blue-600"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     </div>
//                   </div>

//                   {expandedProgram === programa.id.toString() && (
//                     <ProgramaDetails
//                       programa={programa}
//                       onSubmit={handleSubmit}
//                       headquarters={headquarters}
//                       modalities={modalities ?? []}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {programas.length > 0 && (
//           <div className="w-full">
//             <h2 className="font-bold mb-4">Programas seleccionados</h2>
//             <section className="h-[calc(100vh-15rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-full">
//               {/* <section className="bg-white shadow-lg rounded-lg p-6 h-[calc(100vh-15rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-full"> */}
//               <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
//                 {programas?.map((programa) => (
//                   <div
//                     key={`${programa.id}${programa.sede}`}
//                     className="bg-white border rounded p-4 space-y-4"
//                   >
//                     <h3 className="font-medium text-lg">{programa.nombre}</h3>
//                     <span className="text-sm text-gray-600">
//                       {programa.area}
//                     </span>
//                     <div className="text-gray-600 text-sm flex flex-col md:flex-row justify-between">
//                       <span>👨‍🎓Tipo: {programa.tipo.name}</span>
//                       <span>⚙️Modalidad: {programa.modalidad?.name}</span>
//                       <span>🌍Sede: {programa.sede}</span>
//                     </div>
//                     <div className="mt-2">
//                       <p className="font-medium">Planes de Estudio:</p>
//                       <ul className="list-disc list-inside">
//                         {programa.planesEstudio.map((plan) => (
//                           <li key={plan.id} className="text-gray-600 text-sm">
//                             {plan.description} - {plan.academic_cycles} ciclos
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
//         )}
//       </section>
//       <BottomActions
//         content={
//           <>
//             <Button
//               variant="outline"
//               type="button"
//               onClick={() => console.log("Cancelar")}
//             >
//               Cancelar
//             </Button>
//             <Button type="submit">Guardar</Button>
//           </>
//         }
//       />
//     </div>
//   );
// };

// "use client";

// import React, { useState } from "react";
// import { Check } from "lucide-react";
// import type { Programa, ProgramaBase } from "./types";
// import { BottomActions } from "@/components/app/bottom-actions";
// import { Button } from "@/components/ui/button";
// import { IHeadquarter, IProgramPlanStudy, IStudyPlan } from "@/types";
// import { IProgramType } from "@/types/program/IProgramType";
// import { IKnowledgeArea } from "@/types/program/IKnowledgeArea";
// import { IModality } from "@/types/admission/IModality";
// import { FilterHeader } from "./filter-header";
// import { ToastCustom } from "@/components/app";
// import { toast } from "react-toastify";
// import { ProgramaDetails } from "./program-detail";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { IConvocatoryBulkListCreate } from "@/types/admission/IConvocatoryBulkList";
// import { format } from "date-fns";

// interface IProps {
//   uuid?: string | string[] | undefined;
//   data?: IProgramPlanStudy[] | null;
//   headquarters?: IHeadquarter[] | null;
//   programsTypes?: IProgramType[] | null;
//   knowledgeArea?: IKnowledgeArea[] | null;
//   modalities?: IModality[] | null;
// }

// // Esquema de validación con Zod
// const programSchema = z.object({
//   promotion: z.string().min(1, "La promoción es obligatoria"),
//   programas: z.array(
//     z.object({
//       id: z.string(),
//       nombre: z.string(),
//       sede: z.string(),
//       modalidad: z.any(),
//       planesEstudio: z.array(z.any()),
//     })
//   ),
// });

// type ProgramFormData = z.infer<typeof programSchema>;

// interface IProps {
//   uuid?: string | string[];
//   data?: IProgramPlanStudy[] | null;
//   headquarters?: IHeadquarter[] | null;
//   programsTypes?: IProgramType[] | null;
//   knowledgeArea?: IKnowledgeArea[] | null;
//   modalities?: IModality[] | null;
// }

// export const ProgramaFormSelector = ({
//   data,
//   headquarters,
//   programsTypes,
//   knowledgeArea,
//   modalities,
// }: IProps) => {
//   const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<ProgramFormData>({
//     resolver: zodResolver(programSchema),
//     defaultValues: {
//       promotion: "",
//       programas: [],
//     },
//   });

//   const handleAddProgram = (
//     programa: ProgramaBase,
//     modalidad: IModality | undefined,
//     sede: string,
//     planes: IStudyPlan[]
//   ) => {
//     const newPrograma: Programa = {
//       ...programa,
//       id: programa.id, // Keep id as number
//       modalidad,
//       sede,
//       planesEstudio: planes,
//     };

//     const exists = programas.some((p) => p.id.toString() === newPrograma.id.toString() && p.sede === newPrograma.sede);

//     if (!exists) {
//       setValue("programas", [...programas, { ...newPrograma, id: newPrograma.id.toString() }]);
//     } else {
//       toast.error(
//         <ToastCustom title="Programa ya seleccionado" description="Por favor, seleccione otro programa." />
//       );
//     }

//     setExpandedProgram(null);
//   };

//   const mappedProgramas = (data ?? []).map((programa) => ({
//     id: programa.id,
//     tipo: programa.program_type,
//     nombre: programa.name,
//     area: programa.area.map((a) => a.name).join(", "),
//     plans: programa.study_plan.map((plan) => ({
//       id: plan.id,
//       description: plan.description,
//       academic_cycles: plan.academic_cycles,
//       uuid: plan.uuid,
//       is_active: plan.is_active,
//       file: plan.file,
//       program: plan.program,
//     })),
//   }));

//   const programas = watch("programas");

//   const onSubmit = (formData: ProgramFormData) => {
//     const saveData: IConvocatoryBulkListCreate = {
//       uuid: "0",
//       promotion: formData.promotion,
//       cost_quota: "0",
//       cost_total: "0",
//       quotas: 0,
//       months_duration: 0,
//       vacancies: 0,
//       is_active: true,
//       study_plan_uuid: "0",
//       headquarter_uuid: "0",
//       start_date: format(new Date(), "dd/MM/yyyy"),
//       convocatory: 0,
//       modality: 0,
//     }

//     console.log("Datos guardados:", formData);
//     toast.success(
//       <ToastCustom title="Guardado con éxito" description="El formulario fue enviado correctamente." />
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50 space-y-4">
//       <section className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded">
//         <div className="w-full flex flex-col gap-2">
//           <Label>Promoción:</Label>
//           <Input placeholder="Ejemplo: 2024" className="w-full h-9 rounded" {...register("promotion")} />
//           {errors.promotion && <p className="text-red-500 text-sm">{errors.promotion.message}</p>}
//         </div>
//         <FilterHeader programsTypes={programsTypes} knowledgeArea={knowledgeArea} />
//       </section>

//       <section className="flex flex-col md:flex-row items-start gap-4 pb-16">
//         <div className="w-full md:w-2/3">
//           <h2 className="font-bold mb-4">Programas disponibles</h2>
//           <section className="bg-white shadow-lg rounded-lg p-6 h-[calc(100vh-15rem)] overflow-y-auto">
//             <div className="space-y-4">
//               {mappedProgramas?.map((programa) => (
//                 <div key={programa.id} className="border rounded-lg overflow-hidden">
//                   <div
//                     className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
//                       expandedProgram === programa.id.toString() ? "bg-blue-50" : ""
//                     }`}
//                     onClick={() =>
//                       setExpandedProgram(expandedProgram === programa.id.toString() ? null : programa.id.toString())
//                     }
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium text-gray-900">{programa.nombre}</h3>
//                         <p className="text-sm text-gray-500">
//                           {programa.tipo.name} - {programa.area}
//                         </p>
//                       </div>
//                       <Check className={`w-5 h-5 ${expandedProgram === programa.id.toString() ? "text-blue-600" : "text-gray-300"}`} />
//                     </div>
//                   </div>

//                   {expandedProgram === programa.id.toString() && (
//                     <ProgramaDetails
//                       programa={programa}
//                       onSubmit={handleAddProgram}
//                       headquarters={headquarters}
//                       modalities={modalities ?? []}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {programas.length > 0 && (
//           <div className="w-full">
//             <h2 className="font-bold mb-4">Programas seleccionados</h2>
//             <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
//               {programas.map((programa) => (
//                 <div key={`${programa.id}${programa.sede}`} className="border rounded p-4 space-y-4">
//                   <h3 className="font-medium text-lg">{programa.nombre}</h3>
//                   {/* <span className="text-sm text-gray-600">{programa.area}</span> */}
//                   <div className="text-gray-600 text-sm flex flex-col md:flex-row justify-between">
//                     {/* <span>👨‍🎓Tipo: {programa.tipo.name}</span> */}
//                     <span>⚙️Modalidad: {programa.modalidad?.name}</span>
//                     <span>🌍Sede: {programa.sede}</span>
//                   </div>
//                   {programa.planesEstudio.length > 0 && (
//                     <div className="mt-2">
//                       <p className="font-medium">Planes de Estudio:</p>
//                       <ul className="list-disc list-inside">
//                         {programa.planesEstudio.map((plan) => (
//                           <li key={plan.id} className="text-gray-600 text-sm">
//                             {plan.description} - {plan.academic_cycles} ciclos
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )
//                   }
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </section>

//       <BottomActions
//         content={
//           <>
//             <Button variant="outline" type="button" onClick={() => console.log("Cancelar")}>
//               Cancelar
//             </Button>
//             <Button type="submit">Guardar</Button>
//           </>
//         }
//       />
//     </form>
//   );
// };

