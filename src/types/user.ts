
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutionId?: string;
  institution?: Institution;
  status: UserStatus;
  createdAt: string;
  lastLoginAt?: string;
}

export type UserRole = 
  | 'visitor'
  | 'institution_admin'
  | 'director'
  | 'course_coordinator'
  | 'professor'
  | 'secretary'
  | 'student'
  | 'cleaning_staff'
  | 'platform_admin';

export type UserStatus = 'active' | 'pending' | 'suspended' | 'invited';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  email: string;
  phone: string;
  location: string;
  status: InstitutionStatus;
  createdAt: string;
  adminId: string;
}

export type InstitutionType = 'primary' | 'secondary' | 'technical' | 'higher';
export type InstitutionStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export interface InviteLink {
  id: string;
  institutionId: string;
  role: UserRole;
  email?: string;
  token: string;
  expiresAt: string;
  createdBy: string;
  used: boolean;
}

export interface Permission {
  role: UserRole;
  permissions: string[];
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  visitor: ['view_public', 'follow_institutions', 'like_posts'],
  student: ['view_public', 'follow_institutions', 'like_posts', 'comment', 'apply_courses'],
  cleaning_staff: ['profile_visible'],
  professor: ['create_posts', 'comment', 'view_followers'],
  secretary: ['view_applications', 'update_schedules', 'manage_documents'],
  course_coordinator: ['manage_courses', 'answer_questions', 'update_calendar'],
  director: ['view_students', 'view_coordinators', 'create_announcements', 'view_stats'],
  institution_admin: ['edit_institution', 'manage_members', 'publish', 'manage_courses', 'view_applications', 'full_access'],
  platform_admin: ['approve_institutions', 'platform_metrics', 'manage_plans', 'full_platform_access']
};
