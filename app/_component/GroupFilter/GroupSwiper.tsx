"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { IGroup } from "@/types/group";
import BadgeCircle from "./BadgeCircle";
import "swiper/css";

interface GroupSwiperProps {
  mainBadge: Omit<IGroup, "id">;
  badgeList: IGroup[];
}

export default function GroupSwiper({
  mainBadge,
  badgeList,
}: GroupSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="flex py-[7px]">
      <div>
        <BadgeCircle badgeInfo={mainBadge} isMain={true} />
      </div>
      <Swiper
        slidesPerView={"auto"}
        freeMode={true}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {badgeList.map((badge) => (
          <SwiperSlide key={badge.id} className="max-w-[56px]">
            <div
              onClick={() =>
                swiperRef.current?.slideTo(swiperRef.current?.clickedIndex - 2)
              }
            >
              <BadgeCircle badgeInfo={badge} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
