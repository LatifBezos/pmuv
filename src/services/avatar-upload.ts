import type { SupabaseClient } from "@supabase/supabase-js";

export const CREATOR_AVATAR_BUCKET = "creator-avatars";
export const CREATOR_AVATAR_MAX_SIZE = 2 * 1024 * 1024;
export const CREATOR_AVATAR_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

type UploadCreatorAvatarParams = {
  file: File;
  slug: string;
  supabase: SupabaseClient;
  userId: string;
};

type BuildAvatarStoragePathParams = Omit<UploadCreatorAvatarParams, "supabase">;

export type AvatarUploadResult =
  | {
      publicUrl: string;
      storagePath: string;
    }
  | {
      error: string;
    };

export function validateCreatorAvatarFile(file: File) {
  if (!CREATOR_AVATAR_ACCEPTED_TYPES.includes(file.type as AcceptedAvatarType)) {
    return "Choisissez une image JPG, PNG ou WebP.";
  }

  if (file.size > CREATOR_AVATAR_MAX_SIZE) {
    return "L'avatar doit faire moins de 2 Mo.";
  }

  return null;
}

export function getCreatorAvatarAcceptAttribute() {
  return CREATOR_AVATAR_ACCEPTED_TYPES.join(",");
}

export async function uploadCreatorAvatar({
  file,
  slug,
  supabase,
  userId,
}: UploadCreatorAvatarParams): Promise<AvatarUploadResult> {
  const validationError = validateCreatorAvatarFile(file);

  if (validationError) {
    return { error: validationError };
  }

  const storagePath = buildAvatarStoragePath({
    file,
    slug,
    userId,
  });

  const { error } = await supabase.storage
    .from(CREATOR_AVATAR_BUCKET)
    .upload(storagePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return {
      error: getStorageUploadErrorMessage(error),
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(CREATOR_AVATAR_BUCKET).getPublicUrl(storagePath);

  if (!publicUrl) {
    return {
      error:
        `Upload terminé, mais l'URL publique est introuvable. Vérifiez que le bucket "${CREATOR_AVATAR_BUCKET}" est public.`,
    };
  }

  return {
    publicUrl,
    storagePath,
  };
}

function getStorageUploadErrorMessage(error: unknown) {
  const errorShape = error as {
    error?: string;
    message?: string;
    status?: number | string;
    statusCode?: number | string;
  };
  const status = String(errorShape.statusCode ?? errorShape.status ?? "");
  const message = String(errorShape.message ?? "");

  if (
    status === "403" ||
    message.toLowerCase().includes("row-level security") ||
    message.toLowerCase().includes("unauthorized")
  ) {
    return (
      `Upload avatar refusé par Supabase Storage. Le bucket "${CREATOR_AVATAR_BUCKET}" existe probablement, ` +
      "mais les policies RLS doivent autoriser les utilisateurs authentifiés à écrire dans leur dossier `auth.uid()`."
    );
  }

  if (status === "404" || message.toLowerCase().includes("bucket not found")) {
    return `Bucket Supabase Storage "${CREATOR_AVATAR_BUCKET}" introuvable. Créez-le avant d'uploader un avatar.`;
  }

  return (
    `Upload avatar impossible avec le bucket "${CREATOR_AVATAR_BUCKET}". ` +
    "Vérifiez la configuration Storage, les types MIME autorisés et les policies RLS."
  );
}

type AcceptedAvatarType = (typeof CREATOR_AVATAR_ACCEPTED_TYPES)[number];

function buildAvatarStoragePath({
  file,
  slug,
  userId,
}: BuildAvatarStoragePathParams) {
  const owner = sanitizePathSegment(userId);
  const safeSlug = sanitizePathSegment(slug);
  const extension = getSafeExtension(file);

  return `${owner}/${safeSlug}-avatar.${extension}`;
}

function sanitizePathSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getSafeExtension(file: File) {
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";

  return "jpg";
}
