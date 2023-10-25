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
import { imagePlugin } from '@mdxeditor/editor/plugins/image';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import '@mdxeditor/editor/style.css';
import { CustomEventT } from './types';
import { InsertImage } from '@mdxeditor/editor';
import { FileUpload } from './types/fileUpload.type';
import { ulid } from 'ulid';
import Config from '../libs/config/config';

interface EditorProps {
	markdown: string;
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
	onChange: (value: string) => void;
	onBlur: () => void;
	fileUpload?: FileUpload;
}

const Editor: FC<EditorProps> = ({
	markdown,
	editorRef,
	onChange,
	onBlur,
	fileUpload,
}) => {
	console.log('prop0', fileUpload);
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
							<InsertImage />
						</>
					),
				}),
				imagePlugin({
					imageUploadHandler: async (file) => {
						if (!fileUpload) {
							throw new Error('File upload not implemented');
						}
						console.log('fileUpload', fileUpload);
						const fileName = `${ulid()}.${file.name.split('.').pop()}`;
						const key = `temp/${fileName}`;
						const formData = new FormData();
						formData.append('Content-Type', file.type);
						formData.append('acl', 'public-read');
						Object.entries(fileUpload.fields).forEach(([k, v]) => {
							if (k !== 'key') {
								formData.append(k, v);
							}
						});
						formData.append('key', key);
						formData.append('file', file, fileName);

						const image = await fetch(fileUpload.url, {
							body: formData,
							method: 'POST',
						});

						//todo
						// // await fetch('/api/avatar', {
						// // 	method: 'PATCH',
						// // 	body: JSON.stringify({ fileKey, url: image.url.split('?')[0] }),
						// // });
						// return image.url.split('?')[0];
						return `${fileUpload.url}${key}`;
					},
					imageAutocompleteSuggestions: [
						'https://picsum.photos/200/300',
						'https://picsum.photos/200',
					],
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
	fileUpload,
	...properties
}: {
	value: string;
	name: string;
	onChange: (event: CustomEventT) => void;
	onBlur: () => void;
	fileUpload?: FileUpload;
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
				fileUpload={fileUpload}
				{...properties}
			/>
		</div>
	);
}
