export const mockDentists = [
  { id: "1", name: "Theerut", yearOfExperience: 5, areaOfExpertise: ["test1"] },
  {
    id: "2",
    name: "Theerut",
    yearOfExperience: 5,
    areaOfExpertise: ["test1", "test2", "test3"],
  },
  { id: "3", name: "Theerut", yearOfExperience: 5, areaOfExpertise: ["test1"] },
];

export const getDataByDentistId = (id) => {
  return mockDentists.find((clinic) => clinic.id === id);
};
