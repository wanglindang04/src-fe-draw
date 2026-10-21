export type SchoolInfo = {
  province: string;
  ward: string;
  level: string;
  school: string;
  address: string;
};

export type Representative = {
  name: string;
  position: string;
  phone: string;
  email: string;
};

export type Participation = {
  competitions: string[];
  teamCount: string;
  document: File | null;
};

export const EMPTY_SCHOOL_INFO: SchoolInfo = { province: "", ward: "", level: "", school: "", address: "" };
export const EMPTY_REPRESENTATIVE: Representative = { name: "", position: "", phone: "", email: "" };
export const EMPTY_PARTICIPATION: Participation = { competitions: [], teamCount: "", document: null };
