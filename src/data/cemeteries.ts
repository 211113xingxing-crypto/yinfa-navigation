export interface Cemetery {
  id: number;
  cityId: number;
  name: string;
  address: string;
  phone: string;
  priceMin: number;
  priceMax: number;
  plotTypes: string[];
  description: string;
}

export const cemeteries: Cemetery[] = [
  { id: 1, cityId: 1, name: "福寿园", address: "上海市青浦区外青松公路7270号", phone: "021-69209999", priceMin: 50000, priceMax: 300000, plotTypes: ["立碑", "壁葬", "草坪葬", "树葬", "花坛葬"], description: "上海最大的经营性公墓，环境如画，被誉为东方最美墓园。" },
  { id: 2, cityId: 1, name: "滨海古园", address: "上海市奉贤区五四农场", phone: "021-57163580", priceMin: 30000, priceMax: 200000, plotTypes: ["立碑", "壁葬", "草坪葬", "海葬纪念"], description: "面朝大海的陵园，环境开阔，海葬纪念设施齐全。" },
  { id: 3, cityId: 1, name: "松鹤墓园", address: "上海市嘉定区嘉松北路3485号", phone: "021-59506101", priceMin: 40000, priceMax: 250000, plotTypes: ["立碑", "壁葬", "艺术墓"], description: "嘉定区著名墓园，名人墓区众多。" },
  
  { id: 4, cityId: 2, name: "八宝山革命公墓", address: "北京市石景山区上庄大街6号", phone: "010-88259668", priceMin: 100000, priceMax: 500000, plotTypes: ["立碑", "壁葬"], description: "中国规格最高的公墓之一。" },
  { id: 5, cityId: 2, name: "万安公墓", address: "北京市海淀区香山南路万安里1号", phone: "010-62598796", priceMin: 80000, priceMax: 300000, plotTypes: ["立碑", "壁葬", "艺术墓"], description: "北京历史最悠久的公墓，人文气息浓厚。" },
  
  { id: 6, cityId: 4, name: "成都市磨盘山公墓", address: "成都市成华区蜀陵路", phone: "028-83517148", priceMin: 20000, priceMax: 100000, plotTypes: ["立碑", "壁葬", "草坪葬"], description: "成都市区主要公墓，价格相对亲民。" },
  
  { id: 7, cityId: 8, name: "杭州南山陵园", address: "杭州市西湖区虎玉路2号", phone: "0571-86080240", priceMin: 50000, priceMax: 250000, plotTypes: ["立碑", "壁葬", "草坪葬", "艺术墓"], description: "杭州知名陵园，位于西湖景区附近，环境优美。" },
];
