export const mockClinics = [
  {
    id: "1",
    name: "A",
    district: "เมือง",
    province: "ระยอง",
    postalcode: "21000",
    tel: "0000000000",
    region: "ตะวันออก",
  },
  {
    id: "3",
    name: "A",
    district: "เมือง",
    province: "ระยอง",
    postalcode: "21000",
    tel: "0000000000",
    region: "ตะวันออก",
  },
  {
    id: "2",
    name: "A",
    district: "เมือง",
    province: "ระยอง",
    postalcode: "21000",
    tel: "0000000000",
    region: "ตะวันออก",
  },
];

export const getDataByClinicId = (id) => {
  return mockClinics.find((clinic) => clinic.id === id);
};
