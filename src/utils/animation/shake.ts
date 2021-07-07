import arrayOf from '@utils/array/arrayOf';

/**
 *
 * @param range : 흔들리는 범위
 * @param initialDirection 처음 왼쪽으로 갈지 오른쪽으로 갈지 여부
 * @param count 애니메이션 횟수
 * @returns ㅌ
 */
export default function shake(
  range: number,
  count = 5,
  initialDirection = 'left'
) {
  const 방향_보정 = initialDirection === 'left' ? 1 : -1;

  return arrayOf(count).map(v => {
    if (v === 0 || v === count - 1) {
      return 0;
    }

    return v % 2 === 0 ? range * 방향_보정 : range * 방향_보정 * -1;
  });
}
