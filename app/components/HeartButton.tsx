"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const hasFavorited = true;
  const toggleFavorite = () => {};

  return (
    <div
      className="
        relative
        cursor-pointer
        transition
        hover:opacity-80
      "
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className={`absolute -right-[2px] -top-[2px] ${
          hasFavorited ? "fill-rose-500" : "fill-white"
        }`}
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
