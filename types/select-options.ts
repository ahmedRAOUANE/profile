export type SelectOptions = {
    filter?: { 
        column: string; 
        operator: string; 
        value: unknown 
    };
    limit?: number;
    orderBy?: { column: string; ascending?: boolean };
};