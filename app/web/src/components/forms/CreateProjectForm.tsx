"use client"

// TODO add a project description

import type React from "react"

import { useForm, Controller } from "react-hook-form"

import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card"
import { MultiSelect, type OptionType } from "@/components/forms/MultiSelect"

// Mock data for collaborators
const staffMembersOptions: OptionType[] = [
  { value: "j.smith", label: "J. Smith", group: "Waizard" },
  { value: "a.johnson", label: "A. Johnson", group: "Waizard" },
  { value: "m.williams", label: "M. Williams", group: "Waizard" },
  { value: "s.brown", label: "S. Brown", group: "OpenAI" },
  { value: "r.jones", label: "R. Jones", group: "OpenAI" },
  { value: "t.miller", label: "T. Miller", group: "Google" },
  { value: "c.davis", label: "C. Davis", group: "Google" },
  { value: "l.wilson", label: "L. Wilson", group: "Apple" },
]

// Mock data for payslip tools
const dataTypesOptions: OptionType[] = [
  { value: "photos", label: "Photos" },
  { value: "videos", label: "Videos" },
  { value: "text", label: "Text" },
  { value: "voice", label: "Voice" },
]

interface FormValues {
  auditName: string
  projectName: string
  collaborators: string[]
  dataTypes: string[]
  pdfFiles: FileList | null
}

export function CreateProjectForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      auditName: "",
      projectName: "",
      collaborators: [],
      dataTypes: [],
      pdfFiles: null,
    },
  })

  const onSubmit = async (data: FormValues) => {
    // TODO implement backend submission
    console.log({ data })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Form submitted successfully!")
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>New Project</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="required">
              Project Name
            </Label>
            <Input
              id="projectName"
              {...register("projectName", { required: "Project name is required" })}
              placeholder="Awesome Project"
              className={errors.projectName ? "border-destructive" : ""}
            />
            {errors.projectName && <p className="text-sm text-destructive">{errors.projectName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="staff">Staff members</Label>
            <Controller
              name="collaborators"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={staffMembersOptions}
                  selected={field.value}
                  onChangeAction={field.onChange}
                  placeholder="Select staff..."
                  emptyMessage="No staff found."
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataTypes">Data Types desired</Label>
            <Controller
              name="dataTypes"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={dataTypesOptions}
                  selected={field.value}
                  onChangeAction={field.onChange}
                  placeholder="Select desired data types..."
                  emptyMessage="No data types found."
                />
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-8 gap-2">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

