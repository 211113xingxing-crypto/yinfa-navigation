export interface NursingHome {
  id: number;
  cityId: number;
  name: string;
  address: string;
  phone: string;
  priceMin: number;
  priceMax: number;
  bedCount: number;
  bedAvailable: number;
  type: string;
  acceptsDisabled: boolean;
  medicalInsurance: boolean;
  rating: number;
  description: string;
}

export const nursingHomes: NursingHome[] = [
  // 上海
  { id: 1, cityId: 1, name: "上海市第一社会福利院", address: "上海市徐汇区宛平南路465号", phone: "021-64381764", priceMin: 3000, priceMax: 6000, bedCount: 500, bedAvailable: 12, type: "公办", acceptsDisabled: true, medicalInsurance: true, rating: 4.5, description: "上海市民政局直属公办养老机构，环境优美，护理专业。" },
  { id: 2, cityId: 1, name: "亲和源老年公寓", address: "上海市浦东新区秀沿路2999弄", phone: "021-68183388", priceMin: 6000, priceMax: 15000, bedCount: 800, bedAvailable: 25, type: "民办", acceptsDisabled: true, medicalInsurance: false, rating: 4.7, description: "高端养老社区，配套设施完善，提供独立生活、协助生活和专业护理。" },
  { id: 3, cityId: 1, name: "上海中福会养老院", address: "上海市青浦区公园东路1128号", phone: "021-39285999", priceMin: 4000, priceMax: 8000, bedCount: 300, bedAvailable: 8, type: "公办民营", acceptsDisabled: true, medicalInsurance: true, rating: 4.3, description: "医养结合，环境优雅，适合需要医疗护理的高龄老人。" },
  { id: 4, cityId: 1, name: "上海颐和苑养老中心", address: "上海市松江区梅家浜路209号", phone: "021-67671999", priceMin: 2500, priceMax: 5500, bedCount: 400, bedAvailable: 30, type: "民办", acceptsDisabled: false, medicalInsurance: false, rating: 4.0, description: "经济实惠型养老机构，适合自理能力较好的老人。" },
  
  // 北京
  { id: 5, cityId: 2, name: "北京市第一社会福利院", address: "北京市朝阳区华严北里甲2号", phone: "010-62353623", priceMin: 3500, priceMax: 7000, bedCount: 600, bedAvailable: 10, type: "公办", acceptsDisabled: true, medicalInsurance: true, rating: 4.4, description: "国家级示范养老机构，医疗配套齐全。" },
  { id: 6, cityId: 2, name: "泰康之家·燕园", address: "北京市昌平区南邵镇景荣街2号", phone: "010-89758888", priceMin: 8000, priceMax: 20000, bedCount: 1000, bedAvailable: 40, type: "民办", acceptsDisabled: true, medicalInsurance: true, rating: 4.8, description: "泰康保险旗下高端养老社区，医养融合，活力养老。" },
  { id: 7, cityId: 2, name: "北京恭和家园养老社区", address: "北京市朝阳区双桥东路", phone: "010-85398899", priceMin: 5000, priceMax: 12000, bedCount: 450, bedAvailable: 15, type: "民办", acceptsDisabled: true, medicalInsurance: false, rating: 4.5, description: "社区嵌入式养老，离家近，方便子女探望。" },
  
  // 成都
  { id: 8, cityId: 4, name: "成都市第一社会福利院", address: "成都市青羊区光华大道一段", phone: "028-87326888", priceMin: 2000, priceMax: 4500, bedCount: 400, bedAvailable: 20, type: "公办", acceptsDisabled: true, medicalInsurance: true, rating: 4.2, description: "成都市公办养老标杆，价格亲民。" },
  { id: 9, cityId: 4, name: "崇州花果山寿康老年公寓", address: "成都市崇州市花果山路", phone: "028-82295999", priceMin: 3500, priceMax: 8000, bedCount: 350, bedAvailable: 18, type: "民办", acceptsDisabled: true, medicalInsurance: false, rating: 4.4, description: "依山而建，环境清幽，适合颐养天年。" },
  
  // 杭州
  { id: 10, cityId: 8, name: "杭州市社会福利中心", address: "杭州市拱墅区和睦路451号", phone: "0571-88182488", priceMin: 2500, priceMax: 5500, bedCount: 500, bedAvailable: 15, type: "公办", acceptsDisabled: true, medicalInsurance: true, rating: 4.3, description: "杭州市民政局直属，位于市中心交通便利。" },
];
