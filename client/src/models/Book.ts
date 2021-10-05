import Author from "@/models/Author";
import Genre from "@/models/Genre";

export default interface Book {
  _id: string;
  title: string;
  author: Author;
  genre: Genre;
  description?: string;
  img?: string;
  count: number | string;
  rating: number | string;
}
