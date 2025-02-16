export interface Company {
    id: number;
    name: string;
    phone: string;
  }
  
  export interface Device {
    company_id: number;
    device: string;
    ip: string;
    class_id: number;
  }
  
  export interface ClassType {
    id: number;
    type: string;
  }
  