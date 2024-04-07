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
  const { id, name, address, district, province, tel } = clinicInfo;
  const navigate = useNavigate();
  const onClickCard = (clinicId) => {
    navigate(clinicId);
  };

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
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Grid container spacing={0.5} sx={{ mb: 1 }}>
              <Grid textAlign={"left"} item sm={4} xs={12}>
                <FaPhone style={{ transform: "rotate(120deg)" }} />
                Tel:
              </Grid>
              <Grid textAlign={"left"} item sm={8} xs={12}>
                {tel}
              </Grid>
            </Grid>
            <Grid container spacing={0.5}>
              <Grid textAlign={"left"} item sm={4} xs={12}>
                <FaAddressBook />
                Address:
              </Grid>
              <Grid
                textAlign={"left"}
                item
                sm={8}
                xs={12}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {address},{province},{district}
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </DentCardContent>
    </Card>
  );
};

export default ClinicCard;
