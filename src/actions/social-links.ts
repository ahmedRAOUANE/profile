"use server";

import { getUser } from "@/utils/user";
import { FailResponse, SuccessResponse } from "../../types/custome-response";
import { SelectOptions } from "../../types/select-options";
import { deleteOne, selectMany, updateOne } from "@/lib/crud/data";
import { SocialLink } from "../../types/profile-data";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/constants";

/**
 * Get a user's social links.
 *
 * - If no `id` is provided, it fetches links for the **currently authenticated user** (private route).
 * - If `id` is provided, it fetches links for **the specified user** (public route).
 * @param {string} [id] - the user id. optional
 * @param {SelectOption} [options] -  Additional options like filters, ordering, limits. 
 * @returns {Promise<FailResponse<unknown> | SuccessResponse<SocialLink[]>>}
 */
export const getSocialLinks = async (id?: string, options?: SelectOptions): Promise<FailResponse<unknown> | SuccessResponse<SocialLink[]>> => {
    try {
        let userId = id;
        if (!userId) {
            const userResponse = await getUser();
            if (userResponse instanceof FailResponse) {
                return userResponse;
            }

            userId = userResponse.data.id
        }

        const profileResponse = await selectMany<SocialLink>("social_links", {
            filter: {column: "profile_id", operator: "eq", value: userId}, 
            ...options
        });

        return profileResponse;
    } catch (error) {
        console.log("actions > getSocialLinks > error getting spcial links: ", error);
        return new FailResponse("error getting social links", error).toObject();
    }
}


/**
 * Update a user's social link.
 *
 * @param {Partial<SocialLink>} data - The updated link data (must include `id`).
 * @returns {Promise<FailResponse<unknown> | SuccessResponse<SocialLink>>}
 */
export const updateSocialLink = async (data: Partial<SocialLink>): Promise<FailResponse<unknown> | SuccessResponse<SocialLink>> => {
    try {
        if (!data.id) {
            console.log("actions > updateSocialLinks > missing required id: ", data);
            return new FailResponse("missing required id");
        }

        // console.log("data from update server action: ", data);

        const userResponse = await getUser();
        if (userResponse instanceof FailResponse) {
            return userResponse;
        }

        const { platform, url, is_active } = data;

        const updatePayload = {
            ...(platform !== undefined && { platform }),
            ...(url !== undefined && { url }),
            ...(is_active !== undefined && { is_active }),
            updated_at: new Date().toISOString(),
        };

        const updateResponse = await updateOne("social_links", data.id, updatePayload)
        if (updateResponse instanceof SuccessResponse) {
            // TODO: you might need to revalidate the dashboard as well
            revalidatePath(`${baseUrl}/${userResponse.data.id}`)
        }
        // console.log("update response from server action: ", updateResponse)

        return updateResponse.toObject();
    } catch (error) {
        console.log("actions > updateSocialLink > error updating social link: ", error);
        return new FailResponse("error updating social link", error).toObject()
    }
}


export const deleteSocialLink = async (linkId: string) => {
    try { 
        if (!linkId || linkId === "") {
            console.log("actions > deleteSocialLink > missing required id: ", linkId);
            return new FailResponse("missing required id");
        }

        const userResponse = await getUser();
        if (userResponse instanceof FailResponse) {
            return userResponse;
        }

        const deleteResponse = await deleteOne("social_links", linkId);
        if (deleteResponse instanceof SuccessResponse) {
            // TODO: you might need to revalidate the dashboard as well
            revalidatePath(`${baseUrl}/${userResponse.data.id}`)
        }

        return deleteResponse.toObject()
    } catch (error) {
        console.log("actions > deleteSocialLink > error deleting social link: ", error);
        return new FailResponse("error deleting social link", error).toObject()
    }
}

