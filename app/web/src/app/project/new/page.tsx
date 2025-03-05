import { CreateProjectForm } from '@/components/forms/CreateProjectForm'
import React from 'react'

export default function NewProject() {
  return (
    <div className="min-h-screen relative m-0">
      {/* True angular/conic gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#FB575B] via-[#FB575B] to-[#8E52FC]" />

      
      {/* Your content */}
      <div className="relative p-8 h-screen flex flex-col items-center justify-center">
				<main className="flex flex-col items-center justify-center p-10 w-[50%] bg-background rounded-xl">
				<div className="w-full max-w-2xl space-y-6">
					<div className="space-y-2">
						<h1 className="text-2xl font-semibold tracking-tight">Create New Project Form</h1>
						<p className="text-sm text-muted-foreground">Create a new data collection project</p>
					</div>

					<CreateProjectForm />
				</div>
			</main>
      </div>
    </div>
  )
}