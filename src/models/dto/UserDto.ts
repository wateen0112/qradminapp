interface User {
  id: string;
  name: string;
  phoneNumber: string;
  password: string;
  email: string;
  addDate: string;
  isBlocked: boolean;
}
interface AddUsers {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
  isBlocked: boolean;
  role: [];
}
export { User, AddUsers };
