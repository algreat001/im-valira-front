import { OperationMeta } from "interfaces/ext";

type ExtOperationMeta = undefined | OperationMeta;

function calculate(sourceValue: number, operator: ExtOperationMeta): number {
  if (!operator) {
    return sourceValue;
  }
  switch (operator.operation) {
    case "add":
      return sourceValue + operator.operand;
    case "sub":
      return sourceValue - operator.operand;
    case "percentAdd":
      return sourceValue + sourceValue * operator.operand / 100;
    case "percentSub":
      return sourceValue - sourceValue * operator.operand / 100;
  }
}

export function calculatePrice(sourceValue: number, operators: ExtOperationMeta[]): number {
  return operators.reduce<number>(
    (previousValue, currentValue) => calculate(previousValue, currentValue),
    sourceValue
  );
}
