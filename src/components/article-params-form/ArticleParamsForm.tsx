import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useDisclosure } from 'src/hooks/useDisclosure';
import { useRef, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const { isOpen, close, toggle } = useDisclosure(false);
	const formContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleOverlayClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!formContainerRef.current?.contains(target)
			) {
				isOpen && close?.();
			}
		};

		window.addEventListener('mousedown', handleOverlayClick);

		return () => {
			window.removeEventListener('mousedown', handleOverlayClick);
		};
	}, [isOpen]);

	return (
		<div ref={formContainerRef}>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={`${styles.container}${
					isOpen ? ' ' + styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<Select
						options={fontFamilyOptions}
						selected={fontFamilyOptions[0]}
						placeholder={fontFamilyOptions[0].title}
						title='Шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						name='font-size'
						title='Размер шрифта'
						selected={fontSizeOptions[1]}
					/>
					<Select
						options={fontColors}
						selected={fontColors[0]}
						placeholder={fontColors[0].title}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColors[0]}
						placeholder={backgroundColors[0].title}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidthArr[0]}
						placeholder={contentWidthArr[0].title}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
