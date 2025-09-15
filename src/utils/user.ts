import { createServerSb } from "@/lib/supabase/server";
import { FailResponse, SuccessResponse } from "../../types/custome-response";

export const getUser = async () => {
    try {
        const supabase = await createServerSb();

        const {data, error} = await supabase.auth.getUser();
        if (error) {
            console.log("utils/user > getUser > Auth Error", {...error});
            return new FailResponse("invalid or missing session", error);
        }

        if (!data.user) {
            console.log("utils/user > getUser > no user found");
            return new FailResponse("unauthorized: no user found", {status: 404})
        }

        return new SuccessResponse("user", data.user);
    } catch (error) {
        console.log("utils/user > getUser > Error", error);
        return new FailResponse("error getting user", error);
    }
}