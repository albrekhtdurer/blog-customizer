import { useState, useEffect } from 'react';

type TDisclosureCallbacks = {
	onOpen?: () => void;
	onClose?: () => void;
};

export function useDisclosure(
	initialState = false,
	{ onOpen, onClose }: TDisclosureCallbacks = {}
) {
	const [isOpen, setIsOpen] = useState(initialState);

	useEffect(() => {
		setIsOpen(initialState);
	}, [initialState]);

	const open = () => {
		setIsOpen(true);
		onOpen && onOpen();
	};

	const close = () => {
		setIsOpen(false);
		onClose && onClose();
	};

	const toggle = () => {
		isOpen ? close() : open();
	};

	return { isOpen, toggle, open, close };
}
