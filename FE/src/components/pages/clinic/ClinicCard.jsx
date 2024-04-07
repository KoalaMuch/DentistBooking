import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CardActionArea } from "@mui/material";

import ClinicCardPlaceHolder from "@/assets/page/clinic/ClinicCardPlaceholder.jpg";
import { FaPhone, FaAddressBook } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const DentCardContent = ({ children, clickable, onClick }) => {
  return (
    <>
      {clickable && (
        <CardActionArea onClick={onClick}>{children}</CardActionArea>
      )}
      {!clickable && children}
    </>
  );
};

const ClinicCard = ({ clinicInfo, clickable, hideImg }) => {
  const { id, name, district, province, postalcode, tel, region } = clinicInfo;
  const navigate = useNavigate();
  const onClickCard = (clinicId) => {
    navigate(clinicId);
  };
  console.log(clinicInfo);
  return (
    <Card>
      <DentCardContent
        clickable={clickable}
        onClick={onClickCard.bind(null, id)}
      >
        {!hideImg && (
          <CardMedia
            component="img"
            height="140"
            image={ClinicCardPlaceHolder}
            alt="clinic placeholder"
          />
        )}
        <CardContent>
          <Typography
            textAlign={"left"}
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Grid container spacing={2}>
              <Grid textAlign={"left"} item sm={3} xs={12}>
                <FaPhone style={{ transform: "rotate(120deg)" }} />
                Tel:
              </Grid>
              <Grid textAlign={"left"} item sm={9} xs={12}>
                {tel}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid textAlign={"left"} item sm={3.5} xs={12}>
                <FaAddressBook />
                Address:
              </Grid>
              <Grid textAlign={"left"} item sm={8.5} xs={12}>
                {province},{district}
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </DentCardContent>
    </Card>
  );
};

export default ClinicCard;
