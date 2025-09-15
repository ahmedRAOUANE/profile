import { getInvalidFields } from "@/utils/validation"
import { FailResponse, SuccessResponse } from "../../../types/custome-response"
import { createServerSb } from "../supabase/server"
import { SupabaseClient } from "@supabase/supabase-js";

export const getFileUrl = async (
    supabase: SupabaseClient, 
    bucket: string, 
    filePath: string
) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
};

export const uploadFile = async (bucket: string, filePath: string, file: File, options?: {upsert: boolean}) => {
    const invalidFields = getInvalidFields({
        bucket,
        filePath,
        file
    })

    if (invalidFields.length > 0) {
        return new FailResponse(`missing required ${invalidFields.join(", ")}`)
    }

    const supabase = await createServerSb();

    const {error, data} = await supabase.storage.from(bucket).upload(filePath, file, {upsert: options?.upsert ?? false});
    if (error) {
        console.log("uploadFile > failed to upload file: ", error)
        return new FailResponse(error.message || "failed to upload file", error);
    }

    const publicUrl = await getFileUrl(supabase, bucket, filePath);

    return new SuccessResponse("file uploaded successfully", {...data, publicUrl})
}

export const updateFile = async (bucket: string, filePath: string, file: File, options?: { upsert: boolean }) => {
    const invalidFields = getInvalidFields({
        bucket,
        filePath,
        file
    })

    if (invalidFields.length > 0) {
        return new FailResponse(`missing required ${invalidFields.join(", ")}`)
    }

    const supabase = await createServerSb();

    const { error, data } = await supabase.storage.from(bucket).update(filePath, file, {upsert: options?.upsert ?? false});
    if (error) {
        console.log("updateFile > failed to update file: ", error)
        return new FailResponse(error.message || "failed to update file", error);
    }

    const publicUrl = await getFileUrl(supabase, bucket, filePath);

    return new SuccessResponse("file updated successfully", {...data, publicUrl})
}

export const deleteFile = async (bucket: string, filePath: string) => {
    const invalidFields = getInvalidFields({
        bucket,
        filePath
    })

    if (invalidFields.length > 0) {
        return new FailResponse(`missing required ${invalidFields.join(", ")}`)
    }

    const supabase = await createServerSb();

    const { error } = await supabase.storage.from(bucket).remove([filePath])
    if (error) {
        console.log("deleteFile > failed to delete file: ", error)
        return new FailResponse(error.message || "failed to delete file", error);
    }

    return new SuccessResponse("file deleted successfully", null)
}

