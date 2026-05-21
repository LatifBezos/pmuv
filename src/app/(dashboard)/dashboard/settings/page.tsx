"use client";

import Link from "next/link";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCreatorSlugFromUser } from "@/hooks/auth0";
import {
  CREATOR_AVATAR_BUCKET,
  getCreatorAvatarAcceptAttribute,
  uploadCreatorAvatar,
  validateCreatorAvatarFile,
} from "@/services/avatar-upload";
import createClient from "@/utils/supabase/client";

type CreatorProfile = {
  bio: string | null;
  color: string | null;
  id: string;
  image_url: string | null;
  slug: string;
  social_links: unknown;
};

function getWebsiteFromSocialLinks(socialLinks: unknown) {
  if (
    socialLinks &&
    typeof socialLinks === "object" &&
    "website" in socialLinks &&
    typeof socialLinks.website === "string"
  ) {
    return socialLinks.website;
  }

  return "";
}

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "");
}

function isHexColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export default function DashboardSettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [slug, setSlug] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [color, setColor] = useState("#40916c");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCreatorSettings() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (!session?.user) {
        setError("Session introuvable. Reconnectez-vous pour modifier votre profil.");
        setIsLoading(false);
        return;
      }

      setUser(session.user);
      const metadataSlug = getCreatorSlugFromUser(session.user);

      if (!metadataSlug) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("creators")
        .select("id, slug, bio, image_url, color, social_links")
        .eq("slug", metadataSlug)
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      const profile = (data as CreatorProfile | null) ?? null;
      setCreator(profile);
      setSlug(profile?.slug ?? metadataSlug);
      setBio(profile?.bio ?? "");
      setImageUrl(profile?.image_url ?? "");
      setColor(profile?.color ?? "#40916c");
      setWebsite(getWebsiteFromSocialLinks(profile?.social_links));
      setIsLoading(false);
    }

    loadCreatorSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!imageUrl.startsWith("blob:")) return;

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const publicUrl = useMemo(() => {
    if (!slug || typeof window === "undefined") return null;
    return `${window.location.origin}/creator/${slug}`;
  }, [slug]);

  const handleSlugChange = (value: string) => {
    setSlug(normalizeSlug(value));
    setError(null);
    setSuccess(null);
  };

  const handleAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    setError(null);
    setSuccess(null);

    if (!file) {
      setAvatarFile(null);
      return;
    }

    const validationError = validateCreatorAvatarFile(file);
    if (validationError) {
      setError(validationError);
      event.target.value = "";
      return;
    }

    setAvatarFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const nextSlug = normalizeSlug(slug);

    setError(null);
    setSuccess(null);

    if (!user) {
      setError("Session introuvable. Reconnectez-vous pour modifier votre profil.");
      return;
    }

    if (!nextSlug) {
      setError("Choisissez un slug public avant d'enregistrer.");
      return;
    }

    if (!isHexColor(color)) {
      setError("La couleur doit être un code hexadécimal valide, par exemple #40916c.");
      return;
    }

    setIsSaving(true);
    const supabase = createClient();
    const { data: existingCreator, error: slugError } = await supabase
      .from("creators")
      .select("id")
      .eq("slug", nextSlug)
      .maybeSingle();

    if (slugError) {
      setError(slugError.message);
      setIsSaving(false);
      return;
    }

    if (existingCreator && existingCreator.id !== creator?.id) {
      setError("Ce slug est déjà utilisé par un autre créateur.");
      setIsSaving(false);
      return;
    }

    let nextImageUrl = imageUrl.trim() || null;

    if (avatarFile) {
      setIsUploadingAvatar(true);
      const uploadResult = await uploadCreatorAvatar({
        file: avatarFile,
        slug: nextSlug,
        supabase,
        userId: user.id,
      });
      setIsUploadingAvatar(false);

      if ("error" in uploadResult) {
        setError(uploadResult.error);
        setIsSaving(false);
        return;
      }

      nextImageUrl = uploadResult.publicUrl;
    }

    const payload = {
      bio: bio.trim() || null,
      color,
      image_url: nextImageUrl,
      slug: nextSlug,
      social_links: website.trim() ? { website: website.trim() } : null,
    };

    let result = creator
      ? await supabase
          .from("creators")
          .update(payload)
          .eq("id", creator.id)
          .select("id, slug, bio, image_url, color, social_links")
          .maybeSingle()
      : await supabase
          .from("creators")
          .insert(payload)
          .select("id, slug, bio, image_url, color, social_links")
          .maybeSingle();

    if (result.error) {
      setError(result.error.message);
      setIsSaving(false);
      return;
    }

    if (!result.data && creator) {
      result = await supabase
        .from("creators")
        .insert(payload)
        .select("id, slug, bio, image_url, color, social_links")
        .maybeSingle();
    }

    if (result.error) {
      setError(result.error.message);
      setIsSaving(false);
      return;
    }

    if (!result.data) {
      setError(
        "Le profil créateur a été envoyé, mais aucune ligne n'a été retournée. Vérifiez les policies RLS de lecture/écriture sur la table creators.",
      );
      setIsSaving(false);
      return;
    }

    const updatedProfile = result.data as CreatorProfile;
    const { error: metadataError } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        slug: updatedProfile.slug,
      },
    });

    if (metadataError) {
      setError(metadataError.message);
      setIsSaving(false);
      return;
    }

    setCreator(updatedProfile);
    setSlug(updatedProfile.slug);
    setBio(updatedProfile.bio ?? "");
    setImageUrl(updatedProfile.image_url ?? "");
    setAvatarFile(null);
    setColor(updatedProfile.color ?? "#40916c");
    setWebsite(getWebsiteFromSocialLinks(updatedProfile.social_links));
    setSuccess("Profil créateur enregistré.");
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Card>
          <CardContent className="py-8">
            <p className="text-sm font-medium text-muted-foreground">
              Chargement des paramètres...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 flex flex-col gap-2">
        <Badge variant="secondary">Espace créateur</Badge>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-sm text-muted-foreground">
          Personnalisez votre page publique avec les champs disponibles dans le
          schéma actuel.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Enregistrement impossible</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertTitle>Modifications enregistrées</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {!creator && (
          <Alert>
            <AlertTitle>Profil créateur à finaliser</AlertTitle>
            <AlertDescription>
              Aucun profil public n'est encore lié à cette session. Renseignez
              un slug et enregistrez pour créer votre page créateur.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Profil public</CardTitle>
            <CardDescription>
              Ces informations alimentent votre page `/creator/[slug]`.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="creator-slug">Slug public</Label>
              <Input
                id="creator-slug"
                value={slug}
                onChange={(event) => handleSlugChange(event.target.value)}
                placeholder="votre_slug"
                disabled={isSaving}
                aria-describedby="creator-slug-help"
              />
              <p id="creator-slug-help" className="text-xs text-muted-foreground">
                Utilisez lettres, chiffres, tirets ou underscores. Votre page sera
                accessible à cette adresse :{" "}
                {publicUrl ? (
                  <Link href={`/creator/${slug}`} className="font-medium underline">
                    {publicUrl}
                  </Link>
                ) : (
                  "choisissez un slug"
                )}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="creator-bio">Bio</Label>
              <Textarea
                id="creator-bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Présentez-vous à vos supporters."
                disabled={isSaving}
                rows={5}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <Label htmlFor="creator-avatar">Avatar</Label>
                <div className="flex items-center gap-4">
                  <div className="size-16 overflow-hidden rounded-full border bg-muted">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Aperçu de l'avatar créateur"
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-sm font-semibold text-muted-foreground">
                        {slug ? slug.slice(0, 2).toUpperCase() : "AV"}
                      </div>
                    )}
                  </div>
                  <Input
                    id="creator-avatar"
                    type="file"
                    accept={getCreatorAvatarAcceptAttribute()}
                    onChange={handleAvatarFileChange}
                    disabled={isSaving || isUploadingAvatar}
                    aria-describedby="creator-avatar-help"
                  />
                </div>
                <p id="creator-avatar-help" className="text-xs text-muted-foreground">
                  Image JPG, PNG ou WebP, 2 Mo maximum. Stockage attendu : bucket
                  Supabase `{CREATOR_AVATAR_BUCKET}`.
                </p>
                <Input
                  id="creator-image"
                  type="url"
                  value={avatarFile ? "" : imageUrl}
                  onChange={(event) => {
                    setAvatarFile(null);
                    setImageUrl(event.target.value);
                  }}
                  placeholder="Ou collez une URL https://..."
                  disabled={isSaving || isUploadingAvatar}
                  aria-label="URL directe de l'avatar"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="creator-color">Couleur du thème</Label>
                <div className="flex gap-3">
                  <Input
                    id="creator-color"
                    type="color"
                    value={isHexColor(color) ? color : "#40916c"}
                    onChange={(event) => setColor(event.target.value)}
                    disabled={isSaving}
                    className="h-10 w-16 p-1"
                  />
                  <Input
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                    disabled={isSaving}
                    aria-label="Valeur hexadécimale de la couleur"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="creator-website">Lien principal</Label>
              <Input
                id="creator-website"
                type="url"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                placeholder="https://votre-site.com"
                disabled={isSaving}
              />
            </div>

            <div className="flex flex-col gap-3 rounded-xl border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Aperçu rapide</p>
                <p className="text-sm text-muted-foreground">
                  {slug ? `/${slug}` : "Slug à définir"} ·{" "}
                  {bio ? bio.slice(0, 80) : "Bio non renseignée"}
                </p>
              </div>
              <div
                className="size-10 rounded-full border"
                style={{ backgroundColor: color }}
                aria-label="Aperçu de la couleur du thème"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving || isUploadingAvatar}>
                {isUploadingAvatar
                  ? "Upload de l'avatar..."
                  : isSaving
                    ? "Enregistrement..."
                    : "Enregistrer le profil"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payouts</CardTitle>
            <CardDescription>
              La configuration des versements n'est pas encore disponible dans
              cette version.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>
              Bientôt disponible
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
