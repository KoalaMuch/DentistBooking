import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import DentistCardPlaceholder from "@/assets/page/clinic/clinicId/DentistAvatar.jpg";

import { useNavigate } from "react-router-dom";

const DentistCard = ({ dentistInfo }) => {
  const { id, name, yearOfExperience, areaOfExpertise } = dentistInfo;
  const navigate = useNavigate();
  const onClickCard = (dentistId) => {
    navigate(`dentist/${dentistId}`);
  };
  const showAreaOfExpertise = areaOfExpertise.slice(0, 2);
  return (
    <Card>
      <CardActionArea onClick={onClickCard.bind(null, id)}>
        <CardMedia
          component="img"
          height="140"
          image={DentistCardPlaceholder}
          alt="clinic placeholder"
        />
        <CardContent style={{ height: "240px" }}>
          <Typography
            textAlign={"left"}
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography textAlign={"left"} variant="body2" color="text.secondary">
            <div>Year Of Experience:</div>
            <h1>{yearOfExperience}</h1>
            <div>Area Of Expertise:</div>
            <ul style={{ listStyleType: "square", paddingLeft: "20px" }}>
              {showAreaOfExpertise.map((expertise, index) => (
                <li key={index}>{expertise}</li>
              ))}
              {areaOfExpertise.length > 3 && <div>more...</div>}
            </ul>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DentistCard;
