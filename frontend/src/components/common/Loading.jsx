import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <ClipLoader size={40} />
    </div>
  );
};

export default Loading;