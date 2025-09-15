import { getInvalidFields, isValidUUID } from "@/utils/validation";
import { FailResponse, SuccessResponse } from "../../../types/custome-response";
import { SelectOptions } from "../../../types/select-options";
import { createServerSb } from "../supabase/server";

export const selectMany = async <T>(table: string, options?: SelectOptions) => {
    if (!table) {
        return new FailResponse("table name is required");
    }

    const supabase = await createServerSb();
    let query = supabase.from(table).select();

    if (options?.filter) {
        query = query.filter(options.filter.column, options.filter.operator, options.filter.value);
    }
    if (options?.limit) {
        query = query.limit(options.limit);
    }
    if (options?.orderBy) {
        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true });
    }

    const { data, error } = await query;

    if (error || !data) {
        console.log("crud > selectMany > error: ", error);
        return new FailResponse(error?.message || `failed to get data from ${table}`, error);
    }

    return new SuccessResponse("data", data as T[]);
};

export const selectOne = async <T>(table: string, id: string) => {
    const invalidFields = getInvalidFields({ table, id });
    if (invalidFields.length > 0) {
        return new FailResponse(`invalid fields: ${invalidFields.join(", ")}`);
    }

    if (!isValidUUID(id)) {
        console.log(`crud > selectOne > invalid UUID received: ${id}`);
        return new FailResponse(`invalid id: ${id}`);
    }

    const supabase = await createServerSb();
    const { data, error } = await supabase.from(table).select().eq("id", id).single();

    if (error) {
        console.log("crud > selectOne > error: ", error);
        return new FailResponse("Error getting data", error);
    }

    return new SuccessResponse("data", data as T);
};

export const createOne = async <T extends Record<string, unknown>>(table: string, payload: T) => {
    const invalidFields = getInvalidFields({ table, ...payload });
    if (invalidFields.length > 0) {
        return new FailResponse(`invalid fields: ${invalidFields.join(", ")}`);
    }

    const supabase = await createServerSb();
    const { data, error } = await supabase.from(table).insert(payload).select().single();

    if (error) {
        console.log("crud > createOne > error: ", error);
        return new FailResponse("Error inserting data", error);
    }

    return new SuccessResponse("created", data);
};

export const updateOne = async <T extends Record<string, unknown>>(table: string, id: string, payload: Partial<T>) => {
    const invalidFields = getInvalidFields({ table, id });
    if (invalidFields.length > 0) {
        return new FailResponse(`invalid fields: ${invalidFields.join(", ")}`);
    }

    if (!isValidUUID(id)) {
        console.log(`crud > selectOne > invalid UUID received: ${id}`);
        return new FailResponse(`invalid id: ${id}`);
    }

    const supabase = await createServerSb();

    // check the row existence
    const existsRowResponse = await selectOne(table, id);
    if (existsRowResponse instanceof FailResponse) {
        return existsRowResponse
    }

    console.log("updateOne > table:", table);
    console.log("updateOne > id:", id);
    console.log("updateOne > existsRowResponse:", existsRowResponse);
    console.log("updateOne > payload:", payload);


    const { data, error } = await supabase.from(table).update(payload).eq("id", id).select();
    console.log("updateOne > data:", data);
    console.log("updateOne > error:", error);

    if (error) {
        console.log("crud > updateOne > error: ", error);
        return new FailResponse("Error updating data", error);
    }

    return new SuccessResponse("updated", data);
};

export const deleteOne = async (table: string, id: string) => {
    const invalidFields = getInvalidFields({ table, id });
    if (invalidFields.length > 0) {
        return new FailResponse(`invalid fields: ${invalidFields.join(", ")}`);
    }

    if (!isValidUUID(id)) {
        console.log(`crud > selectOne > invalid UUID received: ${id}`);
        return new FailResponse(`invalid id: ${id}`);
    }

    const supabase = await createServerSb();
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
        console.log("crud > deleteOne > error: ", error);
        return new FailResponse("Error deleting data", error);
    }

    return new SuccessResponse("deleted", { id });
};
