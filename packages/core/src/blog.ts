import { Dynamo } from './dynamo';
import { Entity, EntityItem } from 'electrodb';
import { ulid } from 'ulid';

export * as Blog from './blog';

export const ArticleEntity = new Entity(
	{
		model: {
			version: '1',
			entity: 'Article',
			service: 'blog',
		},
		attributes: {
			articleId: {
				type: 'string',
				required: true,
				readOnly: true,
			},
			title: {
				type: 'string',
				required: true,
				readOnly: true,
			},
			content: {
				type: 'string',
				required: true,
			},
		},
		indexes: {
			teams: {
				collection: 'blog',
				pk: {
					field: 'pk',
					composite: [],
				},
				sk: {
					field: 'sk',
					composite: ['articleId'],
				},
			},
		},
	},
	Dynamo.Configuration
);

// export const TicketEntity = new Entity(
//   {
//     model: {
//       version: "1",
//       entity: "Ticket",
//       service: "jira",
//     },
//     attributes: {
//       ticketId: {
//         type: "string",
//         required: true,
//         readOnly: true,
//       },
//       status: {
//         type: ["pending", "blocked", "inprogress", "complete"] as const,
//         required: true,
//       },
//       title: {
//         type: "string",
//         required: true,
//       },
//       teamId: {
//         type: "string",
//         required: true,
//         readOnly: true,
//       },
//     },
//     indexes: {
//       tickets: {
//         collection: "jira",
//         pk: {
//           field: "pk",
//           composite: ["teamId"],
//         },
//         sk: {
//           field: "sk",
//           composite: ["ticketId"],
//         },
//       },
//     },
//   },
//   Dynamo.Configuration
// );

// export type TTicketEntity = EntityItem<typeof TicketEntity>;
export type TTeamEntity = EntityItem<typeof ArticleEntity>;

export async function createArticle(
	title: string,
	content: string
) {
	const result = await ArticleEntity.create({
		title,
		content,
		articleId: ulid(),
	}).go();

	return result.data;
}

// export async function deleteTeam(id: string) {
//   return await TeamEntity.delete({ teamId: id }).go();
// }

// export async function listTeams() {
//   // const res = TeamEntity.query.teams({}).params();
//   // console.log("res: ", res);
//   const result = await TeamEntity.query.teams({}).go();

//   return result.data;
// }

// export async function create(title: string, teamId: string) {
//   const result = await TicketEntity.create({
//     status: "pending",
//     teamId,
//     ticketId: ulid(),
//     title,
//   }).go();

//   return result.data;
// }

// export async function listTickets(id: string) {
//   const result = await TicketEntity.query.tickets({ teamId: id }).go();

//   return result.data;
// }

// export type Statuses = "pending" | "blocked" | "inprogress" | "complete";

// export async function updateStatus(
//   teamId: string,
//   ticketId: string,
//   status: Statuses
// ) {
//   const result = await TicketEntity.update({ ticketId, teamId })
//     .set({ status })
//     .go();

//   return result.data;
// }
