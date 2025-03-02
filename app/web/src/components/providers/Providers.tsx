import React from 'react'
import AppWalletProvider from './AppWalletProvider'

export default function Providers({ 
	children 
} : {
	children: React.ReactNode,
}) {
	return (
		<AppWalletProvider>
			{children}
		</AppWalletProvider>
	)
}
