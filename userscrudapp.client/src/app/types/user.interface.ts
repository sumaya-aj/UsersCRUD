import { City } from "./city.interface";

export interface User {
    id:        number;
    fullName:  string;
    email:     string;
    birthDate: string;
    cityId:    number | null;
    cityName?:  string;
}
