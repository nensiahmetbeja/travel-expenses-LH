import { Role } from "../models/role";

export function pathForRole(role: Role): string {
    switch (role) {
      case Role.EndUser:  return '/traveller';   // was /end-user
      case Role.Approver: return '/approver';
      case Role.Finance:  return '/finance';
      default:            return '/login';
    }
  }
  