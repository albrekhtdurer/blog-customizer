import { useState, SyntheticEvent, CSSProperties } from 'react';
import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import { defaultArticleState } from './constants/articleProps';

import styles from './styles/index.module.scss';

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

export default App;
