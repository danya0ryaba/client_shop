"use client";

import {
  AddressSuggestions,
  DaDataAddress,
  DaDataSuggestion,
} from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  value?: DaDataSuggestion<DaDataAddress> | null;
  onChange?: (value?: DaDataSuggestion<DaDataAddress>) => void;
}

export const AddressInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <AddressSuggestions
      token={process.env.NEXT_PUBLIC_API_DADATA || ""}
      value={value ?? undefined}
      onChange={(data) => onChange?.(data)}
    />
  );
};
