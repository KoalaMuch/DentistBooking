import Grid from "@mui/material/Grid";
import ClinicCard from "@/components/pages/clinic/ClinicCard";
import DentPagination from "@/components/common/DentPagination";

import { mockClinics } from "@/mockData/clinic";
const Index = () => {
  return (
    <>
      <section className="heading">
        <h1>All Clinic</h1>
      </section>
      <section className="content">
        {mockClinics && (
          <Grid container spacing={2}>
            {mockClinics.map((clinic) => (
              <Grid item xs={6} md={4} key={clinic.id}>
                <ClinicCard clinicInfo={clinic} clickable></ClinicCard>
              </Grid>
            ))}
          </Grid>
        )}
        <DentPagination />
      </section>
    </>
  );
};
export default Index;
