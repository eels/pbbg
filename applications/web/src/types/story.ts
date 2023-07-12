export interface Story<T> {
  (args: T): JSX.Element;
  args: T;
}
