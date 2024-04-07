import Grid from "@mui/material/Grid";
import DentPagination from "@/components/common/DentPagination";
import ClinicCard from "@/components/pages/clinic/ClinicCard";

import ClinicCardPlaceHolder from "@/assets/page/clinic/ClinicCardPlaceholder.jpg";
import { FaPhone, FaAddressBook } from "react-icons/fa";

import { useEffect, useState } from "react";
import { getDataByClinicId } from "@/mockData/clinic";
import { useParams } from "react-router-dom";
import { mockDentists } from "@/mockData/dentist";
import DentistCard from "@/components/pages/clinic/clinicId/DentistCard";

const Index = () => {
  const [clinicInfo, setClinicInfo] = useState(null);
  const params = useParams();

  useEffect(() => {
    setClinicInfo(getDataByClinicId(params.clinicId));
  }, []);

  return (
    <>
      <section className="heading-picture">
        <img src={ClinicCardPlaceHolder} />
      </section>
      {clinicInfo && (
        <section className="heading">
          <h1>{clinicInfo.name}</h1>
          <h5>
            {" "}
            <FaPhone style={{ transform: "rotate(120deg)" }} />
            Tel: {clinicInfo.tel}
          </h5>
          <h5>
            <FaAddressBook />
            Address: {clinicInfo.district}, {clinicInfo.province}
          </h5>
        </section>
      )}
      <section className="content">
        <Grid container spacing={2}>
          {mockDentists.map((dentist) => (
            <Grid item xs={6} md={4}>
              <DentistCard dentistInfo={dentist}></DentistCard>
            </Grid>
          ))}
        </Grid>
        <DentPagination />
      </section>
    </>
  );
};
export default Index;
