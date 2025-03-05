import { ProjectSidebar} from '@/components/projectSidebar/ProjectSidebar'
import { SidebarInset, SidebarProvider } from '@/components/shadcn/sidebar'
import React from 'react'

export default function Providers({ 
	children 
} : {
	children: React.ReactNode,
}) {
	return (
		<SidebarProvider>
			<ProjectSidebar />
			<SidebarInset>
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
