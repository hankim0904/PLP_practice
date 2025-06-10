import { ISearchCard } from "@/types/search";
import Image from "next/image";

interface CardProps {
  cardInfo: ISearchCard;
}

export default function Card({
  cardInfo: { image, name_en, price, member_name_en },
}: CardProps) {
  return (
    <section>
      <div className="aspect-square bg-gray-100 rounded-sm flex justify-center items-center">
        <Image
          src={image}
          alt={name_en}
          width={72}
          height={114}
          className="h-[72%] w-[46%] rounded-[4px] border-[0.5px] border-gray-200"
        />
      </div>
      <div>{member_name_en}</div>
      <div>{name_en}</div>
      <div>{price} USD</div>
    </section>
  );
}
