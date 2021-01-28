// This interface modifies the original Express component, adding the user to it
declare namespace Express {
    export interface Request {
        user: {
            id: string
        }
    }
}