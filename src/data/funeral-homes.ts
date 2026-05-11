export interface FuneralHome {
  id: number;
  cityId: number;
  name: string;
  address: string;
  phone: string;
  priceRange: string;
  services: string[];
  description: string;
}

export const funeralHomes: FuneralHome[] = [
  { id: 1, cityId: 1, name: "上海龙华殡仪馆", address: "上海市徐汇区漕溪路210号", phone: "021-64380109", priceRange: "5000-30000", services: ["遗体接运", "冷藏", "整容化妆", "告别仪式", "火化"], description: "上海市规模最大的殡仪馆，设施齐全，服务规范。" },
  { id: 2, cityId: 1, name: "上海宝兴殡仪馆", address: "上海市虹口区西宝兴路833号", phone: "021-56629030", priceRange: "3000-20000", services: ["遗体接运", "守灵", "告别仪式", "火化"], description: "历史悠久的殡仪馆，价格较为亲民。" },
  { id: 3, cityId: 1, name: "上海益善殡仪馆", address: "上海市闵行区老沪闵路1500号", phone: "021-64511025", priceRange: "4000-25000", services: ["遗体接运", "冷藏", "整容化妆", "告别仪式", "火化", "骨灰寄存"], description: "设备先进，环境庄重。" },
  
  { id: 4, cityId: 2, name: "八宝山殡仪馆", address: "北京市石景山区上庄大街6号", phone: "010-88259666", priceRange: "5000-50000", services: ["遗体接运", "冷藏", "整容化妆", "守灵", "告别仪式", "火化", "骨灰寄存"], description: "北京最知名的殡仪馆，承担国家领导人告别仪式。" },
  { id: 5, cityId: 2, name: "东郊殡仪馆", address: "北京市朝阳区平房北街133号", phone: "010-65761628", priceRange: "3000-20000", services: ["遗体接运", "告别仪式", "火化"], description: "北京东部主要殡仪服务机构。" },
  
  { id: 6, cityId: 4, name: "成都市东郊殡仪馆", address: "成都市锦江区大安桥路579号", phone: "028-85917684", priceRange: "2000-15000", services: ["遗体接运", "冷藏", "整容化妆", "告别仪式", "火化"], description: "成都市区主要殡仪馆，服务覆盖主城区。" },
  
  { id: 7, cityId: 8, name: "杭州殡仪馆", address: "杭州市西湖区西溪路731号", phone: "0571-85229164", priceRange: "3000-20000", services: ["遗体接运", "冷藏", "告别仪式", "火化", "骨灰寄存"], description: "杭州市唯一殡仪馆，设施齐全。" },
];
