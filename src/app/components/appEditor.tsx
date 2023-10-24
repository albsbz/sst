'use client';
import { FC, RefCallback, forwardRef, useCallback, useRef } from 'react';
import {
	MDXEditor,
	MDXEditorMethods,
	MDXEditorProps,
} from '@mdxeditor/editor/MDXEditor';
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings';
import { listsPlugin } from '@mdxeditor/editor/plugins/lists';
import { quotePlugin } from '@mdxeditor/editor/plugins/quote';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import '@mdxeditor/editor/style.css';
import { CustomEventT } from './types';

interface EditorProps {
	markdown: string;
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
	onChange: (value: string) => void;
	onBlur: () => void;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef, onChange, onBlur }) => {
	return (
		<MDXEditor
			ref={editorRef}
			markdown={markdown}
			onChange={onChange}
			onBlur={onBlur}
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				toolbarPlugin({
					toolbarContents: () => (
						<>
							<UndoRedo />
							<BoldItalicUnderlineToggles />
						</>
					),
				}),
			]}
		/>
	);
};

export default function AppEditor({
	value,
	onChange,
	onBlur,
	name,
}: {
	value: string;
	name: string;
	onChange: (event: CustomEventT) => void;
	onBlur: () => void;
}) {
	console.log('AppEditor');
	const reference = useRef<MDXEditorMethods>(null);
	const handleChange = useCallback(
		(newValue: string) => {
			console.log('ee', newValue);

			onChange({ target: { name, value: newValue } });
		},
		[name, onChange]
	);
	return (
		<div>
			<input
				type="button"
				onClick={() => reference.current?.setMarkdown('new markdown')}
				value="Set new markdown"
			/>

			<input
				type="button"
				onClick={() => console.log(reference.current?.getMarkdown())}
				value="Get markdown"
			/>

			<Editor
				editorRef={reference}
				markdown={value}
				onChange={handleChange}
				onBlur={onBlur}
			/>
		</div>
	);
}
