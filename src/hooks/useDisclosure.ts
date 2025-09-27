import { useState, useEffect } from 'react';

type TDisclosureCallbacks = {
	onOpen?: () => void;
	onClose?: () => void;
};

export function useDisclosure(
	initialState = false,
	{ onOpen, onClose }: TDisclosureCallbacks = {}
) {
	const [isMenuOpen, setIsMenuOpen] = useState(initialState);

	useEffect(() => {
		setIsMenuOpen(initialState);
	}, [initialState]);

	const open = () => {
		setIsMenuOpen(true);
		onOpen && onOpen();
	};

	const close = () => {
		setIsMenuOpen(false);
		onClose && onClose();
	};

	const toggle = () => {
		isMenuOpen ? close() : open();
	};

	return { isMenuOpen, toggle, open, close };
}
