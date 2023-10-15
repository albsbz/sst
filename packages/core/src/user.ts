export * as User from "./user";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const UserEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "User",
      service: "user",
    },
    attributes: {
      email: {
        type: "string",
        required: true,
      },
      userType: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["email"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Configuration
);

export async function createUser(
	email: string,
	userType: string = "user",
) {
	const result = await UserEntity.create({
		email,
		userType,
	}).go();

	return result.data;
}

