export abstract class Exception extends Error {
  public abstract code: number;
  public abstract message: Lowercase<string>;
}
