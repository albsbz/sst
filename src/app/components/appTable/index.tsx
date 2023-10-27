import { ReactElement } from 'react';
import TableCell from './components/tableCell';

type ComponentParameters = {
	content: (string | ReactElement)[][];
	titles: string[];
};
export default function AppTable({ content, titles }: ComponentParameters) {
	return (
		<div className="relative overflow-x-auto">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						{titles.map((title) => (
							<th scope="col" className="px-6 py-3" key={title}>
								{title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{content.map((row, idx) => {
						return (
							<tr
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								key={`row${idx}`}
							>
								{row.map((cell, idx) => (
									<TableCell key={`cell${idx}`}>{cell}</TableCell>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
