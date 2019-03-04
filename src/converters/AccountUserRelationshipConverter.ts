import { User } from "../onelogin/OneLoginClient";

import {
  ACCOUNT_USER_RELATIONSHIP_CLASS,
  ACCOUNT_USER_RELATIONSHIP_TYPE,
  AccountUserRelationship,
} from "../jupiterone";

import { generateAccountId } from "./AccountEntityConverter";
import { generateUserId } from "./UserEntityConverter";

export function createAccountUserRelationships(users: User[], account: any) {
  const defaultValue: AccountUserRelationship[] = [];

  return users.reduce((acc, user) => {
    const parentId = generateAccountId(account.id);
    const childId = generateUserId(user.id);

    const relationship: AccountUserRelationship = {
      _class: ACCOUNT_USER_RELATIONSHIP_CLASS,
      _fromEntityKey: parentId,
      _key: `${parentId}_has_${childId}`,
      _type: ACCOUNT_USER_RELATIONSHIP_TYPE,
      _toEntityKey: childId,
    };

    return [...acc, relationship];
  }, defaultValue);
}
