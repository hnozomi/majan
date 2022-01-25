import { FC } from "react";
import { InputBet } from "./InputBet";
import { Members } from "../../types/Members";

type Props = {
  params: any;
};

export const DisplayPoints: FC<Props> = (props) => {
  const { params } = props;

  const fieldName: keyof Members = params.field;

  return <InputBet fieldName={fieldName} id={params.id} />;
};
