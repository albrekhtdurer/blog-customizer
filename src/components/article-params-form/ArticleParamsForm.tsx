import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useDisclosure } from 'src/hooks/useDisclosure';
import { useRef, useEffect } from 'react';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const { isOpen, close, toggle } = useDisclosure(false);
	const formContainer = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleOverlayClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !formContainer.current?.contains(target)) {
				isOpen && close?.();
			}
		};

		window.addEventListener('mousedown', handleOverlayClick);

		return () => {
			window.removeEventListener('mousedown', handleOverlayClick);
		};
	}, [isOpen]);

	return (
		<div ref={formContainer}>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={`${styles.container}${
					isOpen ? ' ' + styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
