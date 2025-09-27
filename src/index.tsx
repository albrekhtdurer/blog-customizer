import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, SyntheticEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [articleState, setArticleState] = useState(defaultArticleState);

	const resetHandler = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				stateSetter={setFormState}
				onReset={resetHandler}
				onSubmit={submitHandler}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
