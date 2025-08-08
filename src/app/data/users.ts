import { Role } from '../models/role';

export interface User {
  username: string;
  password: string;
  role: Role;
}

export const USERS: User[] = [
  { username: 'enduser1', password: 'pass123', role: Role.EndUser },
  { username: 'approver1', password: 'pass123', role: Role.Approver },
  { username: 'finance1', password: 'pass123', role: Role.Finance }
];
