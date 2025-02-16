import { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import data from "../../../data.json";
import { Company, Device, ClassType } from "../../components/Interfaces";

const PremiumCustomers = () => {
  const [premiumCompanies, setPremiumCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const filteredCompanies = data.Company.filter((company: Company) =>
      data.Device.some(
        (device: Device) =>
          device.company_id === company.id &&
          data.Class.find((cls: ClassType) => cls.id === device.class_id)?.type === "premium"
      )
    );

    setPremiumCompanies(filteredCompanies);
  }, [data]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ padding: "10px", maxWidth: "90%", width: "1000px" }}>
        <h2 style={{ textAlign: "center", margin: 0, padding: "10px" }}>Premium Customers</h2>
        {premiumCompanies.map((company) => (
          <Accordion key={company.id} style={{ marginBottom: "10px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>
                <Typography variant="h6">{company.name}</Typography>
                <Typography variant="body2" color="textSecondary">{company.phone}</Typography>
                <Typography variant="body2" style={{ fontWeight: "bold", color: "#e20074" }}>
                  {data.Device.filter((d: Device) => d.company_id === company.id && 
                  data.Class.find((cls: ClassType) => cls.id === d.class_id)?.type === "premium").length} device(s)
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {data.Device.filter((d: Device) => d.company_id === company.id && 
              data.Class.find((cls: ClassType) => cls.id === d.class_id)?.type === "premium").map((device) => (
                <div key={device.device}>
                  <Typography variant="body2">{device.device}</Typography>
                  <Typography variant="body2">{device.ip}</Typography>
                  <hr />
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default PremiumCustomers;
