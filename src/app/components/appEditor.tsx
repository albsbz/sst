'use client';
import { FC, forwardRef, useRef } from 'react';
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

interface EditorProps {
	markdown: string;
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
	onChange: () => void;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
	return (
		<MDXEditor
			ref={editorRef}
			markdown={markdown}
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

export default function AppEditor({ placeholder }: { placeholder: string }) {
	const reference = useRef<MDXEditorMethods>(null);
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
				markdown={placeholder}
				onChange={() => {
					console.log(1);
				}}
			/>
		</div>
	);
}
