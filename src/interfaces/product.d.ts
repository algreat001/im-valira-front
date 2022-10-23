export interface EditorProps<T, P = unknown> {
  store: T;
  mode: "new" | "edit";
  params?: P;
}
