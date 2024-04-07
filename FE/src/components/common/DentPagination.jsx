import Pagination from "@mui/material/Pagination";
const DentPagination = ({ count = 1 }) => {
  return (
    <Pagination
      sx={{ display: "flex", justifyContent: "center" }}
      count={count}
    />
  );
};
export default DentPagination;
