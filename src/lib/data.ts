import { cities, type City } from "@/data/cities";
import { nursingHomes, type NursingHome } from "@/data/nursing-homes";
import { funeralHomes, type FuneralHome } from "@/data/funeral-homes";
import { cemeteries, type Cemetery } from "@/data/cemeteries";

export function getCityByPinyin(pinyin: string): City | undefined {
  return cities.find((c) => c.pinyin === pinyin);
}

export function getCityById(id: number): City | undefined {
  return cities.find((c) => c.id === id);
}

export function getNursingHomesByCity(cityId: number): NursingHome[] {
  return nursingHomes.filter((h) => h.cityId === cityId);
}

export function getNursingHomeById(id: number): NursingHome | undefined {
  return nursingHomes.find((h) => h.id === id);
}

export function getFuneralHomesByCity(cityId: number): FuneralHome[] {
  return funeralHomes.filter((h) => h.cityId === cityId);
}

export function getFuneralHomeById(id: number): FuneralHome | undefined {
  return funeralHomes.find((h) => h.id === id);
}

export function getCemeteriesByCity(cityId: number): Cemetery[] {
  return cemeteries.filter((c) => c.cityId === cityId);
}

export function getCemeteryById(id: number): Cemetery | undefined {
  return cemeteries.find((c) => c.id === id);
}

export function searchAll(query: string) {
  const q = query.toLowerCase();
  const matchedCities = cities.filter(
    (c) => c.name.includes(q) || c.pinyin.includes(q)
  );
  const matchedNursing = nursingHomes.filter(
    (h) => h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q)
  );
  const matchedFuneral = funeralHomes.filter(
    (h) => h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q)
  );
  const matchedCemeteries = cemeteries.filter(
    (c) => c.name.toLowerCase().includes(q) || c.address.toLowerCase().includes(q)
  );
  return { cities: matchedCities, nursingHomes: matchedNursing, funeralHomes: matchedFuneral, cemeteries: matchedCemeteries };
}

export { cities , type City } from "@/data/cities";
export { type NursingHome } from "@/data/nursing-homes";
export { type FuneralHome } from "@/data/funeral-homes";
export { type Cemetery } from "@/data/cemeteries";
