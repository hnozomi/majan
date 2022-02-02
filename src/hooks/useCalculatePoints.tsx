import { ChipResults } from "../types/ChipResults";

type ReduceElementType = {
  [key: string]: string | null;
};

export const useCalculatePoints = () => {
  const kaeshi = Number(localStorage.getItem("Kaeshi"));
  const chipInfomation = localStorage.getItem("Chip");
  const { money } = JSON.parse(chipInfomation!);

  const pointTotal = (points: any, name: string) => {
    let total = 0;
    const calculateResult: number = points.reduce(
      (sum: number, element: ReduceElementType, index: number) => {
        const bet = points[index].bet.slice(1) / 100;

        if (element[name] !== null) {
          const pt = Number(element[name]) - kaeshi;
          total = sum + pt * bet;
        }
        return total;
      },
      0
    );

    return calculateResult;
  };

  const calculatePoints = (
    points: any,
    totalChip: ChipResults
  ): ChipResults => {
    let member1Total: number = totalChip.member1 * money;
    let member2Total: number = totalChip.member2 * money;
    let member3Total: number = totalChip.member3 * money;
    let member4Total: number = totalChip.member4 * money;

    const member1Result = pointTotal(points, "member1");
    const member2Result = pointTotal(points, "member2");
    const member3Result = pointTotal(points, "member3");
    const member4Result = pointTotal(points, "member4");

    member1Total = member1Total + member1Result;
    member2Total = member2Total + member2Result;
    member3Total = member3Total + member3Result;
    member4Total = member4Total + member4Result;

    return {
      member1: member1Total,
      member2: member2Total,
      member3: member3Total,
      member4: member4Total,
    };
  };
  return { calculatePoints };
};
