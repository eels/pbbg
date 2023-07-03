export abstract class Exception extends Error {
  public abstract message: Lowercase<string>;
  public abstract code: number;
}
