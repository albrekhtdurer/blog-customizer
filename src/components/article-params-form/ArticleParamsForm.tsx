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
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
	stateSetter: (formState: ArticleStateType) => void;
	formState: ArticleStateType;
	onReset: () => void;
	onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
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

	const onChangeHandler = (param: string) => (option: OptionType) => {
		props.stateSetter({
			...props.formState,
			[param]: option,
		});
	};

	return (
		<div ref={formContainerRef}>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={`${styles.container}${
					isOpen ? ' ' + styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={props.onSubmit}
					onReset={props.onReset}>
					<label className={styles.formTitle}>Задайте параметры</label>
					<Select
						options={fontFamilyOptions}
						selected={props.formState.fontFamilyOption}
						placeholder={props.formState.fontFamilyOption.title}
						onChange={onChangeHandler('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						name='font-size'
						title='Размер шрифта'
						selected={props.formState.fontSizeOption}
						onChange={onChangeHandler('fontSizeOption')}
					/>
					<Select
						options={fontColors}
						selected={props.formState.fontColor}
						placeholder={props.formState.fontColor.title}
						onChange={onChangeHandler('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={props.formState.backgroundColor}
						placeholder={props.formState.backgroundColor.title}
						onChange={onChangeHandler('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={props.formState.contentWidth}
						placeholder={props.formState.contentWidth.title}
						onChange={onChangeHandler('contentWidth')}
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
