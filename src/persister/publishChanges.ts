import {
  IntegrationExecutionContext,
  IntegrationInvocationEvent,
  PersisterClient,
} from "@jupiterone/jupiter-managed-integration-sdk";
import {
  createAccountEntity,
  createAccountUserRelationships,
  createGroupEntities,
  createRoleEntities,
  createUserEntities,
  createUserGroupRelationships,
  createUserRoleRelationships,
} from "../converters";

import {
  AccountEntity,
  GroupEntity,
  JupiterOneDataModel,
  RoleEntity,
  UserEntity,
} from "../jupiterone";
import { OneLoginDataModel } from "../onelogin/OneLoginClient";

export default async function publishChanges(
  persister: PersisterClient,
  oldData: JupiterOneDataModel,
  oneLoginData: OneLoginDataModel,
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
) {
  const newData = convert(oneLoginData, context);

  const entities = [
    ...persister.processEntities<AccountEntity>(
      oldData.accounts,
      newData.accounts,
    ),
    ...persister.processEntities<UserEntity>(oldData.users, newData.users),
    ...persister.processEntities<GroupEntity>(oldData.groups, newData.groups),
    ...persister.processEntities<RoleEntity>(oldData.roles, newData.roles),
  ];

  const relationships = [
    ...persister.processRelationships(
      oldData.userGroupRelationships,
      newData.userGroupRelationships,
    ),
    ...persister.processRelationships(
      oldData.userRoleRelationships,
      newData.userRoleRelationships,
    ),
  ];

  return await persister.publishPersisterOperations([entities, relationships]);
}

export function convert(
  oneLoginDataModel: OneLoginDataModel,
  context: IntegrationExecutionContext<IntegrationInvocationEvent>,
): JupiterOneDataModel {
  return {
    accounts: [createAccountEntity(context.instance)],
    groups: createGroupEntities(oneLoginDataModel.groups),
    users: createUserEntities(oneLoginDataModel.users),
    roles: createRoleEntities(oneLoginDataModel.roles),
    userGroupRelationships: createUserGroupRelationships(
      oneLoginDataModel.users,
    ),
    userRoleRelationships: createUserRoleRelationships(
      oneLoginDataModel.users,
      oneLoginDataModel.roles,
    ),
    accountUserRelationships: createAccountUserRelationships(
      oneLoginDataModel.users,
      context,
    ),
  };
}
