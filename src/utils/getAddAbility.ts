import { IDamageData } from "./getDetailType";

type typeCalculatorType = { type: string; effects: number };

export const getAddAbility = async (
  types: IDamageData[],
  selectedAbility: string
) => {
  const typeCalculator: typeCalculatorType[] = [];

  switch (selectedAbility) {
    case "dry_skin":
      typeCalculator.push({ type: "fire", effects: 1.25 });
      typeCalculator.push({ type: "water", effects: 0 });
      break;
    case "heatproof":
      typeCalculator.push({ type: "fire", effects: 0.5 });
      break;
    case "well_baked_body":
      typeCalculator.push({ type: "fire", effects: 0 });
      break;
    case "delta_stream":
      typeCalculator.push({ type: "flying", effects: 1 });
      // 비행타입 약점이 없어지는 절댓값
      break;
    case "thick_fat":
      typeCalculator.push({ type: "fire", effects: 0.5 });
      typeCalculator.push({ type: "ice", effects: 0.5 });
      break;
    case "storm_drain":
      typeCalculator.push({ type: "water", effects: 0 });
      break;
    case "fluffy":
      typeCalculator.push({ type: "fire", effects: 2 });
      break;
    case "levitate":
      typeCalculator.push({ type: "ground", effects: 0 });
      break;
    case "wonder_guard":
      // *****아직 못구현했삼..
      break;
    case "water_bubble":
      typeCalculator.push({ type: "fire", effects: 0.5 });
      break;
    case "water_absorb":
      typeCalculator.push({ type: "water", effects: 0 });
      break;
    case "motor_drive":
      typeCalculator.push({ type: "electric", effects: 0 });
      break;
    case "purifying_salt":
      typeCalculator.push({ type: "ghost", effects: 0.5 });
      break;
    case "volt_absorb":
      typeCalculator.push({ type: "electric", effects: 0 });
      break;
    case "flash_fire":
      typeCalculator.push({ type: "fire", effects: 0 });
      break;
    case "tera_shell":
      // 특정 타입 공격의 데미지를 줄이거나 방어력을 올림
      // *****아직 못구현했삼..

      break;
    case "lightning_rod":
      typeCalculator.push({ type: "electric", effects: 0 });
      break;
    case "earth_eater":
      typeCalculator.push({ type: "ground", effects: 0 });
      break;
    case "sap_sipper":
      typeCalculator.push({ type: "grass", effects: 0 });
      break;
    case "filter":
      // 효과가 굉장한 공격의 데미지를 줄임
      // 약점의 데미지를 75%줄임
      // *****아직 못구현했삼..
      break;
    default:
      // 없음: 특성 없음
      break;
  }

  if (typeCalculator.length > 0) {
    types = types.map((type) => {
      typeCalculator.forEach((element) => {
        if (type.name === element.type) {
          type.damage *= element.effects;
        }
      });
      return type;
    });
  }

  return typeCalculator;
};
