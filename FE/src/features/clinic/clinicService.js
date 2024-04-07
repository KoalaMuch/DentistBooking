import { BASE_URL_V1 } from "@/config/config";
import axios from "axios";

const API_URL = `${BASE_URL_V1}/clinics`;

const getAllClinics = async (page) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        limit: 3,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const clinicService = {
  getAllClinics,
};

export default clinicService;
