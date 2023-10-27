import { Dynamo } from './dynamo';
import { Entity, EntityItem, QueryOperations } from 'electrodb';
import { ulid } from 'ulid';

export * as Blog from './blog';

export const AuthorEntity = new Entity(
	{
		model: {
			version: '1',
			entity: 'Author',
			service: 'blog',
		},
		attributes: {
			authorId: {
				type: 'string',
				required: true,
				readOnly: true,
			},
			name: {
				type: 'string',
				required: true,
				readOnly: true,
			},
		},
		indexes: {
			posters: {
				collection: 'blog',
				pk: {
					field: 'pk',
					composite: [],
				},
				sk: {
					field: 'sk',
					composite: ['name', 'authorId'],
				},
			},
		},
	},
	Dynamo.Configuration
);

export const PostEntity = new Entity(
	{
		model: {
			version: '1',
			entity: 'Post',
			service: 'blog',
		},
		attributes: {
			postId: {
				type: 'string',
				required: true,
				readOnly: true,
			},
			title: {
				type: 'string',
				required: true,
			},
			content: {
				type: 'string',
				required: true,
			},
			images: {
				type: 'list',
				default: [],
				items: { type: 'string' },
			},
			authorId: {
				type: 'string',
				required: true,
			},
		},
		indexes: {
			posts: {
				collection: 'posts',
				pk: {
					field: 'pk',
					composite: ['authorId'],
				},
				sk: {
					field: 'sk',
					composite: ['postId'],
				},
			},
			allPosts: {
				collection: 'allPosts',
				index: 'gsi2',
				pk: {
					field: 'gsi2pk',
					composite: [],
				},
				sk: {
					field: 'gsi2sk',
					composite: ['postId'],
				},
			},
			postComments: {
				collection: 'postComments',
				index: 'gsi1',
				pk: {
					field: 'gsi1pk',
					composite: ['postId'],
				},
				sk: {
					field: 'gsi1sk',
					composite: [],
				},
			},
		},
	},
	Dynamo.Configuration
);

export const CommentEntity = new Entity(
	{
		model: {
			version: '1',
			entity: 'Comment',
			service: 'blog',
		},
		attributes: {
			postId: {
				type: 'string',
				required: true,
				readOnly: true,
			},
			commentId: {
				type: 'string',
				required: true,
				readOnly: true,
			},
			comment: {
				type: 'string',
				required: true,
			},
			authorId: {
				type: 'string',
				required: true,
				readOnly: true,
			},
		},
		indexes: {
			comments: {
				pk: {
					field: 'pk',
					composite: ['authorId'],
				},
				sk: {
					field: 'sk',
					composite: ['commentId'],
				},
			},
			postComments: {
				collection: 'postComments',
				index: 'gsi1',
				pk: {
					field: 'gsi1pk',
					composite: ['postId'],
				},
				sk: {
					field: 'gsi1sk',
					composite: ['commentId'],
				},
			},
		},
	},
	Dynamo.Configuration
);

export type PostEntityType = EntityItem<typeof PostEntity>;
export type AuthorEntityType = EntityItem<typeof AuthorEntity>;
export type CommentEntityType = EntityItem<typeof CommentEntity>;

export async function createPost({
	authorId,
	title,
	content,
	images,
}: {
	authorId: string;
	title: string;
	content: string;
	images: string[];
}) {
	return PostEntity.create({
		authorId,
		title,
		content,
		postId: ulid(),
		images,
	}).go();
}

export async function createAuthor(name: string) {
	return AuthorEntity.create({
		name,
		authorId: ulid(),
	}).go();
}

export async function getAuthorByName(name: string) {
	return AuthorEntity.query.posters({ name }).go();
}

export async function comment(
	comment: string,
	postId: string,
	authorId: string
) {
	return CommentEntity.create({
		comment,
		commentId: ulid(),
		postId,
		authorId,
	}).go();
}

export async function listAuthors() {
	return AuthorEntity.query.posters({}).go();
}

export async function listPosts({
	perPage,
	cursor,
}: {
	perPage: number;
	cursor: string;
}) {
	let params: Record<string, string> = {};
	if (perPage) {
		params.limit = perPage.toString();
	}
	if (cursor) {
		params.cursor = cursor;
	}
	return PostEntity.query.allPosts({}).go(params);
}

export async function getPosts(authorId: string) {
	// want to see the params that get generated? You can always log them out here.
	// const params = PostEntity.query.posts({ authorId }).params();
	// console.log('params: ', params);

	return PostEntity.query
		.posts({
			authorId,
		})
		.go();
}

export async function getSinglePost(postId: string) {
	return PostEntity.query
		.postComments({
			postId,
		})
		.go();
}

export async function getComments(postId: string) {
	return CommentEntity.query
		.postComments({
			postId,
		})
		.go();
}

export async function getPostersComments(authorId: string) {
	// const params = CommentEntity.query.comments({ authorId }).params();
	// console.log('params: ', params);
	return CommentEntity.query.comments({ authorId }).go();
}

// This is unused but an example of how services can be used.
// const PostService = new Service({ RedditorEntity, PostEntity, CommentEntity });

// export async function getPostFromService(postId: string) {
//   // want to see the params that get generated? You can always log them out here.
//   // const params = PostService.collections.postComments({ postId }).params()
//   // console.log('params: ', params);
//   const data = await PostService.collections.postComments({ postId }).go();

//   return { post: data.PostEntity, comments: data.CommentEntity };
// }
