import { DamageData } from "./getDetailType";

type typeCalculatorType = { type: string; effects: number };

export const getAddAbility = (
  types: DamageData[],
  selectedAbility: string
) => {
  if (!selectedAbility || selectedAbility === "") {
    return types;
  }

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
      // TODO: 비행타입 약점이 없어지는 절댓값 구현 필요
      typeCalculator.push({ type: "flying", effects: 1 });
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
      // TODO: 효과가 굉장한 기술만 맞는 특성 구현 필요
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
      // TODO: 특정 타입 공격의 데미지를 줄이거나 방어력을 올림 구현 필요
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
      // TODO: 효과가 굉장한 공격의 데미지를 75% 줄임 구현 필요
      break;
    default:
      // 없음: 특성 없음
      break;
  }

  if (typeCalculator.length > 0) {
    types = types.map((type) => {
      const matchingEffect = typeCalculator.find((el) => el.type === type.name);

      if (matchingEffect) {
        return {
          ...type,
          damage: type.damage * matchingEffect.effects
        };
      }

      return type;
    });
  }

  return types;
};
