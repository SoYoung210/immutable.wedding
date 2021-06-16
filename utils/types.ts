/**
 * @description Keys에 해당하는 타입을 required로 만들어줍니다.
 */
export type WithRequiredKeys<OriginType, Keys extends keyof OriginType> = Omit<
  OriginType,
  Keys
> &
  Required<Pick<OriginType, Keys>>;
