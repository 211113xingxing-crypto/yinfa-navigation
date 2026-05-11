export interface City {
  id: number;
  name: string;
  pinyin: string;
  province: string;
  tier: string;
}

export const cities: City[] = [
  { id: 1, name: "上海", pinyin: "shanghai", province: "上海", tier: "一线" },
  { id: 2, name: "北京", pinyin: "beijing", province: "北京", tier: "一线" },
  { id: 3, name: "广州", pinyin: "guangzhou", province: "广东", tier: "一线" },
  { id: 4, name: "成都", pinyin: "chengdu", province: "四川", tier: "新一线" },
  { id: 5, name: "重庆", pinyin: "chongqing", province: "重庆", tier: "新一线" },
  { id: 6, name: "武汉", pinyin: "wuhan", province: "湖北", tier: "新一线" },
  { id: 7, name: "南京", pinyin: "nanjing", province: "江苏", tier: "新一线" },
  { id: 8, name: "杭州", pinyin: "hangzhou", province: "浙江", tier: "新一线" },
  { id: 9, name: "天津", pinyin: "tianjin", province: "天津", tier: "新一线" },
  { id: 10, name: "沈阳", pinyin: "shenyang", province: "辽宁", tier: "新一线" },
];
