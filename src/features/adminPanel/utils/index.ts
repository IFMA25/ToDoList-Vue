import { Permission } from "../types";

export const setPermission = (permissionsAll: Permission[], permissionsOption: Permission[]) => {
  const userPermissions = {};
  permissionsAll.forEach((item) => {
    userPermissions[item.value] = permissionsOption.includes(item);
  });
  return userPermissions;
};


// export const setPermission = (
//   permissionsAll: Permission[],
//   permissionsActive: Permission[],
// ) => {
//   const userPermissions: Record<string, boolean> = {};

//   const activeValues = new Set(permissionsActive.map((p) => p.value));

//   permissionsAll.forEach((item) => {
//     userPermissions[item.value] = activeValues.has(item.value);
//   });

//   return userPermissions;
// };
