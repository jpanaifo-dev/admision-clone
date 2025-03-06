/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { AcademicInfoType } from '@/modules/admision/schemas'
import { PROFILE_FORM_LABELS } from '../../config.constants'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useAcademicDegree,
  useUniversity,
  useProfesionalSchools,
} from '@/modules/admision/hooks'
// import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'

//For combobox
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { IAcademicDegree } from '@/types'
//end combobox

const { EDUCATION_FORM } = PROFILE_FORM_LABELS
const { FIELDS } = EDUCATION_FORM

const INSTITUTION_DEFAULT = 'Universidad Nacional de la Amazonía Peruana'
const imageUnap =
  'https://enlinea.unapiquitos.edu.pe/unap/descargas/descargas/isotipoUNAP.jpg'
const defaultImage =
  'https://images.vexels.com/media/users/3/261870/isolated/preview/12f021059bf34c3557729dcda719d9e2-edificio-de-banco-simple.png?width=320'

export const StudyInfoSection = ({
  academicDegrees,
}: {
  academicDegrees: IAcademicDegree[]
}) => {
  const form = useFormContext<AcademicInfoType>()
  const { faculties, loading } = useAcademicDegree()
  const {
    getUniversitiesList,
    loading: loadingUniversity,
    universities,
  } = useUniversity()
  const {
    getProfesionalSchoolsList,
    loading: loadingSchool,
    profesionalSchool,
  } = useProfesionalSchools()

  const [open, setOpen] = useState(false)
  const [searchUniversity, setSearchUniversity] = useState('')

  const institution = form.watch('institution')

  const hasInstitution = institution !== null && institution !== ''
  const isUNAP = institution === INSTITUTION_DEFAULT

  const listUniversities = universities?.results || []
  const facultyUuid = form.watch('faculty')

  useEffect(() => {
    if (open) {
      getUniversitiesList({ search: searchUniversity })
    }
  }, [searchUniversity])

  useEffect(() => {
    if (isUNAP && facultyUuid) {
      getProfesionalSchoolsList({
        admin_unity__uuid: facultyUuid,
      })
    }
  }, [isUNAP, facultyUuid])

  return (
    <>
      {/* Academic Degree */}
      <FormField
        control={form.control}
        name="academic_degree"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>{FIELDS.educationLevel.label}</FormLabel>
            <FormControl>
              <Select
                value={value?.toString() || ''}
                onValueChange={(value) => {
                  onChange(Number(value))
                  const nameDegree = academicDegrees.find(
                    (degree) => degree.id === Number(value)
                  )?.name
                  if (
                    nameDegree?.toLowerCase() === 'Estudiante'.toLowerCase()
                  ) {
                    form.setValue('end_date', null)
                    form.setValue('diploma_date', null)
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loading
                        ? 'Cargando ...'
                        : FIELDS.educationLevel.placeholder
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {academicDegrees.map((degree) => (
                    <SelectItem
                      key={degree.id}
                      value={degree.id.toString()}
                    >
                      {degree.name} ({degree.abbreviation})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              {FIELDS.educationLevel.description}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Institution */}
      {/*Check if institution is UNAP */}
      <FormField
        control={form.control}
        name="institution"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="institution">
              {FIELDS.institutionName.label}
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="institution"
                  aria-describedby={`institution-description`}
                  checked={isUNAP}
                  onCheckedChange={(checked) => {
                    field.onChange(checked ? INSTITUTION_DEFAULT : null)
                    form.setValue('faculty', null)
                  }}
                />
                <Label htmlFor="institution">
                  Soy egresado o estudiante de la{' '}
                  <span className="font-semibold">
                    UNIVERSIDAD NACIONAL DE LA AMAZONIA PERUANA
                  </span>
                </Label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/*Popover */}
      <FormField
        control={form.control}
        name="institution"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              {/* Si hay una universidad seleccionada, la mostramos */}
              {hasInstitution ? (
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Image
                      src={isUNAP ? imageUnap : defaultImage}
                      width={28}
                      height={28}
                      alt="University"
                    />
                    <div className="grid gap-1">
                      <Label>{institution}</Label>
                      <p
                        id={`institution-description`}
                        className="text-muted-foreground text-xs"
                      >
                        {FIELDS.institutionUNAP.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => field.onChange(null)}
                  >
                    <X className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              ) : (
                // Si no hay universidad seleccionada, mostramos el combobox
                <Popover
                  open={open}
                  onOpenChange={setOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {loadingUniversity
                        ? 'Cargando universidades...'
                        : FIELDS.institutionName.placeholder}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full md:min-w-[820px] p-0">
                    <Command>
                      <CommandInput
                        onValueChange={setSearchUniversity}
                        value={searchUniversity}
                        placeholder="Buscar universidad..."
                      />
                      <CommandList>
                        <CommandEmpty>
                          {`No se encontraron resultados para "${searchUniversity}"`}
                        </CommandEmpty>
                        <CommandGroup>
                          {listUniversities.map((uni) => (
                            <CommandItem
                              key={uni.id}
                              value={uni.name}
                              onSelect={() => {
                                field.onChange(uni.name)
                                form.setValue('faculty', null)
                                form.setValue('program_career', null)
                                form.setValue('denomination', null)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  institution === uni.name
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {uni.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Faculty */}
      {isUNAP && (
        <FormField
          control={form.control}
          name="faculty"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{FIELDS.faculty.label}</FormLabel>
              <FormControl>
                <Select
                  value={value?.toString() || ''}
                  onValueChange={(value) => {
                    onChange(value)
                    form.setValue('program_career', null)
                    form.setValue('denomination', null)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        loading ? 'Cargando ...' : FIELDS.faculty.placeholder
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((faculty) => (
                      <SelectItem
                        key={faculty.uuid}
                        value={faculty.uuid}
                      >
                        {faculty.name} ({faculty.abbreviation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>{FIELDS.faculty.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Career */}
      <FormField
        control={form.control}
        name="program_career"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>{FIELDS.careerName.label}</FormLabel>
            <FormControl>
              {isUNAP ? (
                <Select
                  value={value?.toString() || ''}
                  required
                  onValueChange={(value) => {
                    onChange(value)
                    const denomination =
                      profesionalSchool?.find((school) => school.name === value)
                        ?.denomination || null
                    form.setValue('denomination', denomination)
                  }}
                  disabled={form.watch('faculty') === null}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        loadingSchool
                          ? 'Cargando ...'
                          : FIELDS.careerName.placeholder
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {profesionalSchool?.map((faculty) => (
                      <SelectItem
                        key={faculty.uuid}
                        value={faculty.name}
                      >
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  {...field}
                  value={value || ''}
                  onChange={onChange}
                  required
                  placeholder={'Ingrese el nombre de la carrera'}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Denomination */}
      <FormField
        control={form.control}
        name="denomination"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELDS.denomination.label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={isUNAP}
                value={field.value || ''}
                placeholder={FIELDS.denomination.placeholder}
              />
            </FormControl>
            {!isUNAP && (
              <FormDescription>
                {FIELDS.denomination.description}
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
