export default interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  info?: object;
  roles?: string[];
}
