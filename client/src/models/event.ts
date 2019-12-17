export interface Event { 
    ID: string; 
    Name: string; 
    Country: string; 
    Location: { 
      ID: string; 
      Name: string; 
      Address: string; 
    }; 
    StartDate: number; 
    EndDate: number; 
    OpenTime: number; 
    CloseTime: number; 
}