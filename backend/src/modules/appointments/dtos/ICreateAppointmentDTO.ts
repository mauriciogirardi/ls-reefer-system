export default interface ICreateAppointmentDTO {
  date: Date;
  customer_id: string;
  user_id: string;
  technician: string;
  typeService: string;
  device: string;
  btus: number;
  quantity: number;
  electric: string;
  price: number;
  placeOfService: string;
  placeOfInstallation: string;
  obs: string;
  status: boolean;
}
