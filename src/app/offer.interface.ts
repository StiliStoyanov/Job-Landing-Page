export interface Offer{
    id?: number,
    title: string,
    description: string,
    type: string,
    likes: number,
    clickedLike?: boolean,
    idUsersApplied?: { [key: string]:  string;},
    orgCreatedId?: number,
    category?: string
}