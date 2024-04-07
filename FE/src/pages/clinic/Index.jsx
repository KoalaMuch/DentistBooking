import Grid from "@mui/material/Grid";
import ClinicCard from "@/components/pages/clinic/ClinicCard";
import DentPagination from "@/components/common/DentPagination";

import { mockClinics } from "@/mockData/clinic";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllClinics } from "@/features/clinic/clinicSlice";
const Index = () => {
  const [page, setPage] = useState(1);

  const { isLoading, responseGetAll } = useSelector((state) => state.clinic);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClinics(page));
  }, [page]);

  return (
    <>
      <section className="heading">
        <h1>All Clinic</h1>
      </section>
      <section className="content">
        {!isLoading && responseGetAll && (
          <Grid container spacing={2}>
            {responseGetAll.data.map((clinic) => (
              <Grid item xs={6} md={4} key={clinic.id}>
                <ClinicCard clinicInfo={clinic} clickable></ClinicCard>
              </Grid>
            ))}
          </Grid>
        )}
        {!isLoading && (
          <DentPagination count={responseGetAll.pagination.totalPage} />
        )}
      </section>
    </>
  );
};
export default Index;
