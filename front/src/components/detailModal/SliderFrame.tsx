import { useAppSelector } from '@store/hook';
import React, { useCallback, useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import * as S from './style';

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
}

const SliderFrame = ({ loop = true, speed = 400, children }: sliderProps) => {
  const imageList = useAppSelector((state) => state.postSlice.postDetail)?.imageList;
  const settings = useMemo<Settings>(
    () => ({
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      slidesToScroll: 1,
      // customPaging: (i) => {
      //   return (
      //     <div>
      //       {i} / {imageList?.length}
      //     </div>
      //   );
      // },
      // fade: true,
      dots: true,
    }),
    [loop, speed],
  );

  return (
    <S.SlideWrapper>
      <Slider {...settings}>{children}</Slider>
    </S.SlideWrapper>
  );
};

export default SliderFrame;
