'use client'

import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
	let price = cartProduct.basePrice
	if (cartProduct.category == '661fb2d5f22baee8656bb3ae')
		price = cartProduct.size.price
	if (cartProduct.extras?.length > 0) {
		for (const extra of cartProduct.extras) {
			price += extra.price
		}
	}
	return price
}

export const AuthProvider = ({ children }) => {
	const [cartProducts, setCartProducts] = useState([])

	const path = usePathname()

	const ls = typeof window !== 'undefined' ? window.localStorage : null

	useEffect(() => {
		if (ls && ls.getItem('cart')) {
			setCartProducts(JSON.parse(ls.getItem('cart')))
		}

		const keyDownHandler = event => {
			console.log(path)
			if (event.key === 'F1') {
				event.preventDefault()
				if (!path.includes('guide')) {
					window.open('https://dodo-shaderka.vercel.app/guide')
				}
			}
		}

		document.addEventListener('keydown', keyDownHandler)

		return () => {
			document.removeEventListener('keydown', keyDownHandler)
		}
	}, [])

	const clearCart = () => {
		setCartProducts([])
		saveCartProductsToLocalStorage([])
	}

	const removeCartProduct = indexToRemove => {
		setCartProducts(prevCartProducts => {
			const newCartProducts = prevCartProducts.filter(
				(v, index) => index !== indexToRemove
			)
			saveCartProductsToLocalStorage(newCartProducts)
			return newCartProducts
		})
	}

	const saveCartProductsToLocalStorage = cartProducts => {
		if (ls) {
			ls.setItem('cart', JSON.stringify(cartProducts))
		}
	}

	const addToCart = (product, size = null, extras = []) => {
		setCartProducts(prevProducts => {
			const cartProduct = { ...product, size, extras }
			const newProducts = [...prevProducts, cartProduct]
			saveCartProductsToLocalStorage(newProducts)
			return newProducts
		})
	}

	return (
		<SessionProvider>
			<CartContext.Provider
				value={{
					cartProducts,
					setCartProducts,
					addToCart,
					removeCartProduct,
					clearCart,
				}}
			>
				{children}
			</CartContext.Provider>
		</SessionProvider>
	)
}
