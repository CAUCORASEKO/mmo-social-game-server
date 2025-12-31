export interface UserProfile {
  id: string;
  username: string;
  role: 'player' | 'admin';
}

const userProfiles = new Map<string, UserProfile>();

export function saveUserProfile(profile: UserProfile): void {
  userProfiles.set(profile.id, profile);
}

export function getUserProfileById(id: string): UserProfile | null {
  return userProfiles.get(id) ?? null;
}