"use server";

import { getUser } from "@/utils/user";
import { FailResponse, SuccessResponse } from "../../types/custome-response";
import { selectOne, updateOne } from "@/lib/crud/data";
import { updateFile } from "@/lib/crud/files";
import { ProfileData } from "../../types/profile-data";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/constants";
import { getSocialLinks } from "./social-links";
import { SelectOptions } from "../../types/select-options";

/**
 * if id passed -> this means the user is trying to access from public route -> no auth check required
 * 
 * if no id passed -> this means the user is trying to access from private route -> auth check required
 * @param id string
 * @returns 
 */
export const getProfileData = async (id?: string) => {
    try {
        let userId = "";
        if (!id) {
            const userResponse = await getUser();
            if (userResponse instanceof FailResponse) {
                return userResponse;
            }
    
            const user = userResponse.data;
            userId = user.id
        }
        
        const profileResponse = await selectOne<ProfileData>("profiles", id || userId);
        
        return profileResponse;
    } catch (error) {
        console.log("server actions > getProfileData > error: ", error);
        return new FailResponse("error getting the profile data", error)
    }
}

export const updateProfileData = async (userId: string, formData: FormData) => {
    try {
        if (!userId || userId === "") {
            console.log("server actions > getProfileData > missing user id: ", userId);
            return new FailResponse("missing required user id").toObject();
        }

        // user validation
        const userResponse = await getUser();
        if (userResponse instanceof FailResponse) {
            return userResponse.toObject();
        }
        
        const existsUserResponse = await selectOne<ProfileData>("profiles", userResponse.data?.id)
        if (existsUserResponse instanceof FailResponse) {
            return existsUserResponse.toObject();
        }

        // file upload
        const avatar = formData.get('avatar') as File
        let avatarData;

        if (avatar) {
            const avatarext = avatar.name.split(".").pop()?.toLocaleLowerCase()
            const avatarName = `${userId}.avatar.${avatarext}`

            const uploadResponse = await updateFile("avatars", `${userId}/${avatarName}`, avatar, {upsert: true});
            if (uploadResponse instanceof FailResponse) {
                return uploadResponse.toObject();
            }

            avatarData = uploadResponse.data;
        }

        // update profile data
        const avatarUrlWithCacheBust = 
            `${avatarData?.publicUrl}?v=${existsUserResponse.data.updated_at}` || 
            existsUserResponse.data.avatar_url;

        const payload: Pick<ProfileData, "avatar_url" | "bio" | "email" | "username" | "updated_at"> = {
            bio: formData.get('bio') as string || existsUserResponse.data.bio,
            avatar_url: avatarUrlWithCacheBust,
            username: formData.get('username') as string || existsUserResponse.data.username,
            email: formData.get('email') as string || existsUserResponse.data.email,
            updated_at: new Date().toISOString()
        }
        
        const updateResponse = await updateOne("profiles", existsUserResponse.data.id, payload);
        
        revalidatePath(`${baseUrl}/dashboard`)
        revalidatePath(`${baseUrl}/${userId}`)
        
        return updateResponse.toObject();
    } catch (error) {
        console.log("server actions > updateProfileData > error: ", error);
        return new FailResponse("error updateting the profile data", error)
    }
}

export const updateSocialLins = async (userId: string, formData: FormData) => {
    try {
        if (!userId || userId === "") {
            console.log("server actions > getProfileData > missing user id: ", userId);
            return new FailResponse("missing required user id").toObject();
        }

        // user validation
        const userResponse = await getUser();
        if (userResponse instanceof FailResponse) {
            return userResponse.toObject();
        }
        
        const existsUserResponse = await selectOne<ProfileData>("profiles", userResponse.data?.id)
        if (existsUserResponse instanceof FailResponse) {
            return existsUserResponse.toObject();
        }

        // file upload
        const avatar = formData.get('avatar') as File
        let avatarData;

        if (avatar) {
            const avatarext = avatar.name.split(".").pop()?.toLocaleLowerCase()
            const avatarName = `${userId}.avatar.${avatarext}`

            const uploadResponse = await updateFile("avatars", `${userId}/${avatarName}`, avatar, {upsert: true});
            if (uploadResponse instanceof FailResponse) {
                return uploadResponse.toObject();
            }

            avatarData = uploadResponse.data;
        }

        // update profile data
        const avatarUrlWithCacheBust = 
            `${avatarData?.publicUrl}?v=${existsUserResponse.data.updated_at}` || 
            existsUserResponse.data.avatar_url;

        const payload: Pick<ProfileData, "avatar_url" | "bio" | "email" | "username" | "updated_at"> = {
            bio: formData.get('bio') as string || existsUserResponse.data.bio,
            avatar_url: avatarUrlWithCacheBust,
            username: formData.get('username') as string || existsUserResponse.data.username,
            email: formData.get('email') as string || existsUserResponse.data.email,
            updated_at: new Date().toISOString()
        }
        
        const updateResponse = await updateOne("profiles", existsUserResponse.data.id, payload);
        
        revalidatePath(`${baseUrl}/dashboard`)
        revalidatePath(`${baseUrl}/${userId}`)
        
        return updateResponse.toObject();
    } catch (error) {
        console.log("server actions > updateProfileData > error: ", error);
        return new FailResponse("error updateting the profile data", error)
    }
}

/**
 * Get a user's full profile including their social links.
 *
 * - If no `id` is provided, it fetches data for the **currently authenticated user** (private route).
 * - If `id` is provided, it fetches data for **the specified user** (public route).
 *
 * @param {string} [id] - The user ID. Optional.
 * @returns {Promise<FailResponse<unknown> | SuccessResponse<{ profile: ProfileData, socialLinks: SocialLink[] }>>}
 */
// TODO: this frunction will be later updated to get the stats and analytics data when implemented
export const getFullProfile = async (
    id?: string,
    options?: SelectOptions
): Promise<
    | FailResponse<unknown>
    | SuccessResponse<ProfileData>
> => {
    try {
        const profileResponse = await getProfileData(id)
        if (profileResponse instanceof FailResponse) {
            return profileResponse;
        }

        const socialLinksResponse = await getSocialLinks(id, options);

        if (socialLinksResponse instanceof FailResponse) {
            return socialLinksResponse;
        }

        // 4️⃣ Combine both
        return new SuccessResponse("data", {
            ...profileResponse.data,
            social_links: socialLinksResponse.data,
        } as ProfileData).toObject();
    } catch (error) {
        console.log("server actions > getFullProfile > error: ", error);
        return new FailResponse("error getting full profile", error).toObject();
    }
};

