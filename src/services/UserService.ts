import { photoToBlob } from "./PhotoService";

interface UserProfileContract {
  id: number;
  name: string;
  balance: number;
  profile_photo_url?: string;
  has_verification_photo: boolean;
}

async function getProfile(
  initData: string
): Promise<UserProfileContract | null> {
  const resp = await fetch("/api/users/profile", {
    method: "GET",
    headers: {
      "Init-Data": initData
    }
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function updateProfile(
  initData: string
): Promise<UserProfileContract | null> {
  const resp = await fetch("/api/users/profile", {
    method: "POST",
    headers: {
      "Init-Data": initData,
      "Content-Type": "application/json"
    }
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function registerUser(
  initData: string
): Promise<UserProfileContract | null> {
  const resp = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Init-Data": initData
    }
  });
  if (!resp.ok) return null;
  return await ((await resp.json()) as Promise<UserProfileContract>);
}

async function updateVerificationPhoto(initData: string, verificationPhoto: string) {
  const formData = new FormData();
  const blob = photoToBlob(verificationPhoto);
  formData.append("verification_photo", blob);

  const resp = await fetch("/api/users/update_verification_photo", {
    method: "POST",
    headers: {
      "Init-Data": initData
    },
    body: formData
  });
  if (!resp.ok) return null;
}

async function getProfilePhotoUrl(initData: string, userId: number) {
  const resp = await fetch(`/api/users/profile/photo/${userId}`, {
    method: "GET",
    headers: {
      "Init-Data": initData
    }
  });
  if (!resp.ok) return null;
  const blob = await resp.blob();
  return URL.createObjectURL(blob);
}

export { getProfile, registerUser, getProfilePhotoUrl, updateProfile, updateVerificationPhoto };
export type { UserProfileContract };
