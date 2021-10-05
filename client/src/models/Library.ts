export interface Coords {
  lat: number | string;
  lng: number | string;
}

interface Options {
  position: Coords;
  title: string;
}

export default interface Library {
  _id: number | string;
  name: string;
  address?: string;
  options?: Options;

  // books?: Book;
}
