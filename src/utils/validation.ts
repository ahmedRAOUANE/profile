const validImageTypes: string[] = ["image/jpeg", "image/png"];

/**
 * check the object properties that 
 * have the value "" | null | undefined | file.size = 0
 * and return them as invalid fields
 * 
 * this function does not handle boolean values
 * 
 * @param fields object
 * @returns string[]
 */
export const getInvalidFields = (fields: Record<string, unknown>) => {
    return Object.keys(fields).filter(key => {
        const value = fields[key];

        return (
            value === '' ||
            value === null ||
            value === undefined ||
            (value instanceof File && (
                value.size === 0 || 
                !validImageTypes.includes(value.type) 
            ))
        );
    });
}

/**
 * validates the parameter as UUID
 * 
 * @param {string} [value] 
 * @returns 
 */
export const isValidUUID = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
