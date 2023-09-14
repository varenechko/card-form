import Image from "next/image";
import Amex from "../../shared/assets/amex-card.svg";
import Visa from "../../shared/assets/visa.svg";
import Mastercard from "../../shared/assets/mastercard-2.svg";
import UnknownCardLogo from "../../shared/assets/credit-card-svgrepo-com.svg";

import { FC } from "react";

interface Props {
  cardNumber: string;
}

const getLogoSvg = (num: string) => {
  switch (num) {
    case "3":
      return <Image src={Amex} alt="amex card logo" />;
    case "4":
      return <Image src={Visa} alt="visa card logo" />;
    case "5":
      return <Image src={Mastercard} alt="mastercard card logo" />;

    default:
      return <Image src={UnknownCardLogo} alt="card logo" />;
  }
};

export const CardLogo: FC<Props> = ({ cardNumber }) => {
  const logo = getLogoSvg(cardNumber[0]);

  return logo;
};
