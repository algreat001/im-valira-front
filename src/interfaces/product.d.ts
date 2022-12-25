export interface EditorProps<T, P = unknown> {
  store: T;
  mode: "new" | "edit";
  params?: P;
}

export interface ReviewEditParams {
  index?: number;
}

export interface CharacteristicEditParams {
  name?: string;
}
