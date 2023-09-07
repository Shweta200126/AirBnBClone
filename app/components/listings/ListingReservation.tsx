'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { useState } from "react";

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  dayCount: number;
  guestOptions: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  dayCount,
  guestOptions,
}) => {
   

    const [guests, setGuests] = useState(1);

  const handleGuestsChange = (event: any) => {
    const newGuests = parseInt(event.target.value, 10);
    setGuests(newGuests);
  };

  
    // Calculate total price based on the number of guests
    const totalWithGuests = (dayCount <= 1 ? 1 : dayCount) * guests * price;

  return ( 
    <div 
      className="
        bg-white 
        rounded-xl 
        border-[1px]
        border-neutral-200 
        overflow-hidden
      "
    >
      <div className="
      flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ {price}
        </div>
        <div className="font-light text-neutral-600">
        / night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
                    onChangeDate(value.selection)}
      />
      <hr />
      <div
      className="
        bg-white 
        rounded-xl 
        border-[1px]
        border-neutral-200 
        overflow-hidden
      "
    >
      {/* ... Other parts of the component ... */}
      
      <div className="p-4">
        <label htmlFor="guests" className="font-semibold">
          Guests:
        </label>
        <select
          id="guests"
          name="guests"
          value={guests}
          onChange={handleGuestsChange}
          className="ml-2 p-2 border rounded-md"
        >
          {Array.from({ length: guestOptions }, (_, i) => i + 1).map((option) => (
            <option key={option} value={option}>
              {option} {option === 1 ? 'guest' : 'guests'}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
        {dateRange.startDate && dateRange.endDate ? (
            dateRange.startDate === dateRange.endDate ? (
              `Booking for ${dateRange.startDate.toLocaleDateString()}`
            ) : (
              `Booking from ${dateRange.startDate.toLocaleDateString()} to ${dateRange.endDate.toLocaleDateString()}`
            )
          ) : (
            'Select booking dates'
          )}
        </div>
      </div>
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
           {dayCount > 1 ? `${price} X ${dayCount} nights` : dayCount === 1 ? `${price} X ${dayCount} night` : ''}
        </div>
        <div>
        $ {totalWithGuests}
        </div>
      </div>
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reserve" 
          onClick={onSubmit}
        />
      </div>
    </div>
    </div>
   );
}
 
export default ListingReservation;
