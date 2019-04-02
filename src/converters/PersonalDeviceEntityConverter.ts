import {
  PERSONAL_DEVICE_ENTITY_CLASS,
  PERSONAL_DEVICE_ENTITY_TYPE,
  PersonalDeviceEntity,
} from "../jupiterone";
import {
  PersonalDevice,
  PersonalDevicesDict,
} from "../onelogin/OneLoginClient";

import generateKey from "../utils/generateKey";

export function createPersonalDeviceEntities(
  personalDevicesDict: PersonalDevicesDict,
): PersonalDeviceEntity[] {
  const defaultValue: PersonalDeviceEntity[] = [];

  const deviceArrays: PersonalDevice[][] = Object.values(personalDevicesDict);

  const deviceEntities =
    deviceArrays &&
    deviceArrays.reduce(
      (acc: PersonalDeviceEntity[], personalDevices: PersonalDevice[]) => {
        const devices: PersonalDeviceEntity[] =
          personalDevices &&
          personalDevices.map((device: PersonalDevice) => ({
            _class: PERSONAL_DEVICE_ENTITY_CLASS,
            _key: generateKey(PERSONAL_DEVICE_ENTITY_TYPE, device.id),
            _type: PERSONAL_DEVICE_ENTITY_TYPE,
            displayName: device.type_display_name,
            id: device.id,
            default: device.default,
            active: device.active,
            auth_factor_name: device.auth_factor_name,
            type_display_name: device.type_display_name,
            user_display_name: device.user_display_name,
            needs_trigger: device.needs_trigger,
          }));

        return acc.concat(devices);
      },
      defaultValue as PersonalDeviceEntity[],
    );

  return deviceEntities;
}
