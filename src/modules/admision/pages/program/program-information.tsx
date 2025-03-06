import React from 'react'
import { IProgramDetails } from '@/types'

interface ProgramInformationProps {
  programData: IProgramDetails
}

export const RenderHtml = (html: string) => {
  return { __html: html }
}

export const TitleParagraph = ({ text }: { text: string }) => (
  <h3 className="text-xl sm:text-2xl font-extrabold text-primary-900">{text}</h3>
)

export const ProgramInformation = (props: ProgramInformationProps) => {
  const { programData } = props
  const { program, requirements } = programData

  const notRequirementsEmpty = requirements && requirements.length > 0

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <TitleParagraph text="Objetivos del programa" />
        <p className="text-foreground text-justify">{program.objective}</p>
      </div>

      <div className="space-y-4">
        <TitleParagraph text="Perfil del estudiante" />
        <div
          className="text-justify"
          dangerouslySetInnerHTML={RenderHtml(program.aplicant_profile)}
        />
      </div>

      <div className="space-y-4">
        <TitleParagraph text="Perfil del graduado" />
        <div
          className="text-justify"
          dangerouslySetInnerHTML={RenderHtml(program.graduate_profile)}
        />
      </div>

      {notRequirementsEmpty && (
        <div className="space-y-4">
          <TitleParagraph text="Requisitos de postulación" />
          <ul className="list-none list-inside flex flex-col gap-4">
            {requirements.map((requirement, index) => (
              <li
                key={index}
                className="text-foreground p-4 border border-gray-300 rounded-md"
              >
                <h4 className="text-primary-900 font-bold text-lg">
                  {requirement.name}
                </h4>
                <hr className="my-2" />
                <div
                  className="text-gray-800 space-y-2 text-justify"
                  dangerouslySetInnerHTML={RenderHtml(requirement.description)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {!notRequirementsEmpty && (
        <div className="space-y-4">
          <TitleParagraph text="Requisitos de postulación" />
          <p className="text-foreground">No se ha encontrado información</p>
        </div>
      )}
    </div>
  )
}
