import { IntegrationInstance } from "@jupiterone/jupiter-managed-integration-sdk";
import {
  ACCOUNT_ENTITY_CLASS,
  ACCOUNT_ENTITY_TYPE,
  AccountEntity,
} from "../jupiterone";

export function generateAccountId(id?: string) {
  return `onelogin-account-id-${id}`;
}

export function createAccountEntity(
  instance: IntegrationInstance,
): AccountEntity {
  return {
    _class: ACCOUNT_ENTITY_CLASS,
    _key: generateAccountId(instance.id),
    _type: ACCOUNT_ENTITY_TYPE,
    displayName: instance.config.accountName || instance.name,
    name: instance.config.accountName || instance.name,
  };
}
