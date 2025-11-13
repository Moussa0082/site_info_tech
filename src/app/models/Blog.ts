
import { Categorie } from "./Categorie";


export interface Blog {
    idBlog:          string;
    titre:           string;
    description:     string;
    image:           string;
    dateCreation:    string;
    datePublication: string;
    auteur:          string;
    categorie?:       Categorie;
    active:          boolean;
}
