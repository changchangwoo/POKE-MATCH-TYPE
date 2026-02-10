import { superEffectiveAgainst } from "@data/typeEffectiveness";

export const isValidForBlank = (
  candidateName: string,
  chain: { name: string }[],
  blankIdx: number,
): boolean => {
  const prevType = chain[blankIdx - 1].name;
  const nextType = chain[blankIdx + 1].name;

  const candidateBeatsLeft =
    superEffectiveAgainst[candidateName]?.includes(prevType) ?? false;
  const rightBeatsCandidate =
    superEffectiveAgainst[nextType]?.includes(candidateName) ?? false;

  return candidateBeatsLeft && rightBeatsCandidate;
};
