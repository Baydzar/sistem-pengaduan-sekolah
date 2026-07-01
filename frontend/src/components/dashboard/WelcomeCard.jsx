const WelcomeCard = ({ user }) => {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mb-6 shadow">
  
        <h2 className="text-2xl font-bold">
          Selamat Datang, {user?.nama || "User"} 👋
        </h2>
  
        <p className="mt-2 text-blue-100">
          Semoga harimu menyenangkan. Berikut adalah ringkasan data pengaduan hari ini.
        </p>
  
      </div>
    );
  };
  
  export default WelcomeCard;