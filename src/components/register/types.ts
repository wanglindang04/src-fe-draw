export type StudentInfo = {
  fullName: string;
  birthDate?: Date;
  province: string;
  ward: string;
  level: string;
  school: string;
  grade: string;
};

export const EMPTY_STUDENT_INFO: StudentInfo = {
  fullName: "",
  birthDate: undefined,
  province: "",
  ward: "",
  level: "",
  school: "",
  grade: "",
};
