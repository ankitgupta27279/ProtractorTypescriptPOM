export interface BaseEntity {
    email: string,
    password: string
}

export interface signup extends BaseEntity {
    name: string
}

export interface signin extends BaseEntity {

}