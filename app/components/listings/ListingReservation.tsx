"use client";

import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  disabledDates: Date[];
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disabledDates,
  onChangeDate,
  onSubmit,
  disabled,
}) => {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border-[1px]
        border-neutral-200
        bg-white
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          gap-1
          p-4
        "
      >
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Resreve" onClick={onSubmit} />
      </div>
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
          p-4
          text-lg
          font-semibold
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;