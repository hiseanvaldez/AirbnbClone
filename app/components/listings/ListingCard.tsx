"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Button from "../Button";
import HeartButton from "../HeartButton";

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  currentUser,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const {
    id,
    title,
    description,
    imageSrc,
    createdAt,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue,
  } = data;

  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="
        group
        col-span-1
        cursor-pointer
      "
      onClick={() => router.push(`/listing/${id}`)}
    >
      <div
        className="
          flex
          w-full
          flex-col
          gap-2
        "
      >
        <div
          className="
            relative
            aspect-square
            w-full
            overflow-hidden
            rounded-xl
          "
        >
          <Image
            fill
            alt="listing"
            src={imageSrc}
            className="
              h-full
              w-full
              object-cover
              transition
              group-hover:scale-110
            "
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={id} currentUser={currentUser} />
          </div>
        </div>
        <div className="truncate whitespace-nowrap text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
