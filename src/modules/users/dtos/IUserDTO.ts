export default interface IUserDTO {
  name: string;
  email: string;
  password: string;
  date_birth?: Date;
  permissions: string[];
}
