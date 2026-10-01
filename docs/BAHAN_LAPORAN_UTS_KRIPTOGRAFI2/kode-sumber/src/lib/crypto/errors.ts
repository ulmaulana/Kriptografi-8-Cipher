/**
 * Galat yang pesannya aman ditampilkan kepada pengguna. `field` menunjuk
 * kolom formulir yang bermasalah bila ada.
 */
export class UserFacingError extends Error {
  readonly field: string | undefined;

  constructor(message: string, field?: string) {
    super(message);
    this.name = "UserFacingError";
    this.field = field;
  }
}
