/**
 * @description Keys에 해당하는 타입을 required로 만들어줍니다.
 */
export type WithRequiredKeys<OriginType, Keys extends keyof OriginType> = Omit<
  OriginType,
  Keys
> &
  Required<Pick<OriginType, Keys>>;

/**
 * @description rootElement를 ReactElement 혹은 html tag로 사용하기 위한 타입
 */
export type ComponentPassThrough<
  T extends React.ElementType,
  Props
> = React.ComponentPropsWithoutRef<T> & {
  component?: T;
} & Props;
