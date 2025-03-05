import React from 'react'
import AppWalletProvider from './AppWalletProvider'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer, Bounce } from "react-toastify"

export default function Providers({ 
	children 
} : {
	children: React.ReactNode,
}) {
	return (
		<SessionProvider>
			<AppWalletProvider>
				{children}
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
					transition={Bounce}
				/>
			</AppWalletProvider>
		</SessionProvider>
	)
}
