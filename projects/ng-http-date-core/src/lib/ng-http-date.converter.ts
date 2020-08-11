export abstract class NgHttpDateConverter<T> {

  getRegex(): RegExp {
    return null;
  }

  abstract getOrder(): number;

  abstract getName(): string;

  /**
   * Converts a string to the desired type.
   * The string may not be a valid date so the method could throw or return null;
   *
   * @param dateString a valid date string
   */
  abstract convert(dateString: string): T;
}
