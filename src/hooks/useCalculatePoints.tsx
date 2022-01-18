import { useState } from "react";
import { PointsContext } from "../context/MembersPointsContext";
import { ChipResults } from "../types/ChipResults";

type Props = {
  points: any;
  totalChip: any;
  calculatePoints: any;
};

export const useCalculatePoints = () => {
  console.log("useCalculatePoints実行");
  const kaeshi = Number(localStorage.getItem("Kaeshi"));
  const chipInfomation = localStorage.getItem("Chip");
  const { money } = JSON.parse(chipInfomation!);
  const [total, setTotal] = useState({});

  const calculatePoints = (
    points: any,
    totalChip: ChipResults
  ): ChipResults => {
    // チップの合計は先でも後でも計算結果は一緒になりそう
    let member1Total: number = 100 * money;
    let member2Total: number = 100 * money;
    let member3Total: number = 100 * money;
    let member4Total: number = 100 * money;

    // 配列から1つだけ取り出して、別関数で計算する

    for (var i = 0; i < points.length; i++) {
      const bet = points[i].bet.slice(1) / 100;

      if (points[i].member1 !== null) {
        const pt1 = Number(points[i].member1) - kaeshi;
        member1Total = member1Total + pt1 * bet;
      }
      // if (points[i].member2 !== null) {
      //   const pt2 = Number(points[i].member2) - kaeshi;
      //   member2Total = member2Total + pt2 * bet;
      // }
      // if (points[i].member3 !== null) {
      //   const pt3 = Number(points[i].member3) - kaeshi;
      //   member3Total = member3Total + pt3 * bet;
      // }
      // if (points[i].member4 !== null) {
      //   const pt4 = points[i].member4 - kaeshi;
      //   member4Total = member4Total + pt4 * bet;
      // }
      // setTotal({ ...total, [member1]: tempTotal });
    }
    // setResult({
    //   ...result,
    //   member1: member1Total,
    //   member2: member2Total,
    //   member3: member3Total,
    //   member4: member4Total,
    // });

    const pointTotal = (point: any, bet: number) => {
      for (var i = 0; i < points.length; i++) {
        if (point.member1 !== null) {
          const pt1 = Number(point.member1) - kaeshi;
          member1Total = member1Total + pt1 * bet;
        }
      }
    };

    return {
      member1: member1Total,
      member2: member2Total,
      member3: member3Total,
      member4: member4Total,
    };
  };
  return { calculatePoints };
};
