import { TLanguageType } from "../models/settingData";
import speciesData from "../datas/speciesData.json";

export const getSpeciesTranslate = (
  name: string,
  language: TLanguageType
): string => {
  if (/-mega-x$/.test(name)) return speciesData["megaX"][language]
  if (/-mega-y$/.test(name)) return speciesData["megaY"][language]
  if (/-mega$/.test(name)) return speciesData["mega"][language]
  if (/-gmax$/.test(name)) return speciesData["gmax"][language]
  if (/-galar$/.test(name)) return speciesData["galar"][language]
  if (/-alola$/.test(name)) return speciesData["alola"][language]
  if (/-hisui$/.test(name)) return speciesData["hisui"][language]
  if (/-paldea$/.test(name)) return speciesData["paldea"][language]
  if (/-hoenn$/.test(name)) return speciesData["hoenn"][language]
  if (/-sinnoh$/.test(name)) return speciesData["sinnoh"][language]
  if (/-unova$/.test(name)) return speciesData["unova"][language]
  if (/-kalos$/.test(name)) return speciesData["kalos"][language]
  return speciesData["default"][language];
};
