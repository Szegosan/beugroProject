import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import data from "../../../data.json";
import { Device, ClassType } from "../../components/Interfaces";

const ServiceClass: React.FC = () => {
  const [devices, setDevices] = useState<(Device & { id: number; class_type: string })[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device & { id: number; class_type: string } | null>(null);
  const [open, setOpen] = useState(false);
  const [newClassType, setNewClassType] = useState<string>("");
  const [error, setError] = useState<string>("");

  const columns: GridColDef[] = [
    { field: "device", headerName: "Device Name", flex: 1 },
    { field: "ip", headerName: "IP Address", flex: 1 },
    { field: "class_type", headerName: "Service Class", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={() => handleEditClick(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    setDevices(
      data.Device.map((device, index) => ({
        id: index,
        ...device,
        class_type: data.Class.find((cls: ClassType) => cls.id === device.class_id)?.type || "Unknown",
      }))
    );
  }, [data]);

  const handleEditClick = (device: Device & { id: number; class_type: string }) => {
    setSelectedDevice(device);
    setNewClassType(device.class_type);
    setError("");
    setOpen(true);
  };

  const validServiceClasses = data.Class.map((cls: ClassType) => cls.type);

  const handleSave = () => {
    if (!validServiceClasses.includes(newClassType)) {
      setError("Invalid Service Class! Must be one of: " + validServiceClasses.join(", "));
      return;
    }
    if (selectedDevice) {
      setDevices((prev) =>
        prev.map((d) => (d.id === selectedDevice.id ? { ...d, class_type: newClassType } : d))
      );
    }
    setOpen(false);
  };


  return (
    <div style={{ 
      flexGrow: 1,
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "calc(100vh - 110px - 35px)"
    }}>
      <h2 style={{ textAlign: "center", margin: 0, padding: "10px" }}>Manage Service Classes</h2>
      
      <div style={{ height: "69vh", width: "100%", maxWidth: "80%", backgroundColor: "#fff" }}>
        <DataGrid rows={devices} columns={columns} pageSizeOptions={[10, 50, 100]} />
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Service Class</DialogTitle>
        <DialogContent>
          <TextField
            label="Service Class"
            fullWidth
            margin="dense"
            value={newClassType}
            onChange={(e) => setNewClassType(e.target.value)}
            error={!!error}
            helperText={error || `Valid values: ${validServiceClasses.join(", ")}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">Cancel</Button>
          <Button onClick={handleSave} color="success" disabled={!newClassType}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServiceClass;
