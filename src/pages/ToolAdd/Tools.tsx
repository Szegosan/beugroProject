import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import data from "../../../data.json";
import { Device } from "../../components/Interfaces";

const Tools: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(data.Device);
  const [open, setOpen] = useState(false);
  const [newDevice, setNewDevice] = useState<Device>({
    company_id: data.Company[0].id,
    device: "",
    ip: "",
    class_id: data.Class[0].id,
  });
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<{ device?: string; ip?: string }>({});
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);
  const [alert, setAlert] = useState<{ message: string; severity: "success" | "error" | "warning" | null }>({
    message: "",
    severity: null,
  });

  const companyNames = data.Company.reduce((acc, company) => {
    acc[company.id] = company.name;
    return acc;
  }, {} as Record<number, string>);

  const classTypes = data.Class.reduce((acc, classItem) => {
    acc[classItem.id] = classItem.type;
    return acc;
  }, {} as Record<number, string>);

  const columns: GridColDef[] = [
    { field: "device", headerName: "Device_Name", flex: 1, minWidth: 150 },
    { field: "ip", headerName: "IP_Address", flex: 1, minWidth: 150 },
    { field: "company_name", headerName: "Company", flex: 1, minWidth: 150 },
    { field: "class_type", headerName: "Service_Class", flex: 1, minWidth: 150 },
  ];

  const handleAddDevice = () => {
    if (!isValid) return;
    setDevices([...devices, { ...newDevice }]);
    setAlert({ message: "Device save was successful!", severity: "success" });
    resetForm();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    resetForm();
  };

  const deviceRegex = /^[a-zA-Z]+-[a-zA-Z0-9]{3,}-[a-zA-Z]+-[0-9]{2}$/;
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])$/;

  const validateForm = (deviceData: Device) => {
    let validationErrors: { device?: string; ip?: string } = {};

    if (!deviceRegex.test(deviceData.device)) {
      validationErrors.device = "Invalid format! Correct format e.g.: xx-xxx-x-00";
    }

    if (!ipRegex.test(deviceData.ip)) {
      validationErrors.ip = "Invalid IP address format! Correct format e.g.: 192.168.1.1";
    }

    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  };

  const handleInputChange = (field: keyof Device, value: string) => {
    setNewDevice((prev) => {
      const updatedDevice = { ...prev, [field]: value };
      validateForm(updatedDevice);
      return updatedDevice;
    });
  };

  const sortedCompanies = [...data.Company].sort((a, b) => a.name.localeCompare(b.name));

  const resetForm = () => {
    setNewDevice({
      company_id: data.Company[0].id,
      device: "",
      ip: "",
      class_id: data.Class[0].id,
    });
    setErrors({});
    setIsValid(false);
  };

  const handleDelete = () => {
    setDevices((prevDevices) => prevDevices.filter((_, index) => !selectedIds.includes(index)));
    setSelectedIds([]);
    setAlert({ message: "Device(s) was Deleted!", severity: "warning" });
  };

  const handleCloseAlert = () => {
    setAlert({ message: "", severity: null });
  };

  useEffect(() => {
    setDevices(data.Device);
  }, [data]);

  return (
    <div style={{ 
      flexGrow: 1,
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "calc(100vh - 110px - 35px)"
      }}>
      <h2 style={{ textAlign: "center", margin: 0, padding: "10px" }}>Device List</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <IconButton color="secondary" onClick={() => setOpen(true)}>
          <ControlPointIcon fontSize="medium" />
        </IconButton>
        <IconButton
          color="error"
          onClick={handleDelete}
          disabled={selectedIds.length === 0}
        >
          <DeleteForeverIcon fontSize="medium" />
        </IconButton>
      </div>

      <div style={{ height: "65vh", width: "100%", maxWidth: "80%", backgroundColor: "#fff" }}>
        <DataGrid
          rows={devices.map((device, index) => ({
            id: index,
            ...device,
            company_name: companyNames[device.company_id],
            class_type: classTypes[device.class_id],
          }))}
          columns={columns}
          pageSizeOptions={[10, 50, 100]}
          checkboxSelection
          rowSelectionModel={selectedIds}
          onRowSelectionModelChange={(newSelection) => setSelectedIds(newSelection)}
          disableRowSelectionOnClick
        />
      </div>

      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Add New Device</DialogTitle>
        <DialogContent>
        <TextField
          label="Device Name"
          fullWidth
          margin="dense"
          value={newDevice.device}
          onChange={(e) => handleInputChange("device", e.target.value)}
          error={Boolean(errors.device)}
          helperText={errors.device || "e.g.: xx-xxx-x-00"}
        />
        <TextField
          label="IP Address"
          fullWidth
          margin="dense"
          value={newDevice.ip}
          onChange={(e) => handleInputChange("ip", e.target.value)}
          error={Boolean(errors.ip)}
          helperText={errors.ip || "e.g.: 192.168.1.1"}
        />
          <TextField
            select
            label="Company"
            fullWidth
            margin="dense"
            value={newDevice.company_id}
            onChange={(e) => setNewDevice({ ...newDevice, company_id: Number(e.target.value) })}
          >
            {sortedCompanies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Service Class"
            fullWidth
            margin="dense"
            value={newDevice.class_id}
            onChange={(e) => setNewDevice({ ...newDevice, class_id: Number(e.target.value) })}
          >
            {data.Class.map((classItem) => (
              <MenuItem key={classItem.id} value={classItem.id}>
                {classItem.type}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="error">Cancel</Button>
          <Button onClick={handleAddDevice} color="success" disabled={!isValid}>Add Device</Button>
        </DialogActions>
      </Dialog>

      {alert.severity && (
        <Snackbar open={true} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert severity={alert.severity as "success" | "error"} onClose={handleCloseAlert}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Tools;
