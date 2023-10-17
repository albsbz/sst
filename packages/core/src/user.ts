export * as User from './user';
import { Dynamo } from './dynamo';
import { Entity, EntityItem } from 'electrodb';
type UserTypeT = 'user' | 'admin';
export const UserEntity = new Entity(
	{
		model: {
			version: '1',
			entity: 'User',
			service: 'blog',
		},
		attributes: {
			email: {
				type: 'string',
				required: true,
			},
			name: {
				type: 'string',
			},
			userType: {
				type: ['user', 'admin'] as const,
				required: true,
				default: 'user',
			},
		},
		indexes: {
			primary: {
				pk: {
					field: 'pk',
					composite: ['email'],
				},
				sk: {
					field: 'sk',
					composite: [],
				},
			},
		},
	},
	Dynamo.Configuration
);

export type TUserEntity = EntityItem<typeof UserEntity>;

export async function createUser(email: string, userType: UserTypeT = 'user') {
	const result = await UserEntity.create({
		email,
		userType,
	}).go();

	return result.data;
}

export async function setUserName(email: string, name: string) {
	const result = await UserEntity.patch({
		email,
	}).set({ name });

	return result.data;
}
