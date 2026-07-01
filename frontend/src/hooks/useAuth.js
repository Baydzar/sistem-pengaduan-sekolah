import { getToken } from "../utils/storage";

const useAuth = () => {
  return !!getToken();
};

export default useAuth;