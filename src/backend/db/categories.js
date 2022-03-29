import { v4 as uuid } from "uuid";
import { category1, category2, category3, category4 } from "../../images";
/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Thriller",
    description: "",
    thumbnail: category1,
  },
  {
    _id: uuid(),
    categoryName: "Drama",
    description: "",
    thumbnail: category2,
  },
  {
    _id: uuid(),
    categoryName: "Scifi",
    description: "",
    thumbnail: category3,
  },
  {
    _id: uuid(),
    categoryName: "Romance",
    description: "",
    thumbnail: category4,
  },
];
