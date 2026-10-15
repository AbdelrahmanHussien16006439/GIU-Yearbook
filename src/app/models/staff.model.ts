
/*
FILE: staff.model.ts
WHAT: Defines the structure of staff data.
WHY: Allows StaffService to use a typed StaffMember object.
*/

export interface StaffMember {
  id: number;
  name: string;
  [key: string]: unknown;
}
