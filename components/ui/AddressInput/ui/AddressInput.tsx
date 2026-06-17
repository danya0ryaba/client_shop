"use client";

import {
  AddressSuggestions,
  DaDataAddress,
  DaDataSuggestion,
} from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: DaDataSuggestion<DaDataAddress>) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token={process.env.NEXT_PUBLIC_API_DADATA || ""}
      onChange={(data) => onChange?.(data)}
    />
  );
};
