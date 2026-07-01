const TrackingTimeline = ({ status }) => {

    const steps = [
      "Pending",
      "Proses",
      "Selesai",
    ];
  
    const currentIndex =
      steps.indexOf(status);
  
    return (
  
      <div className="mt-6">
  
        <h3 className="font-semibold mb-4">
          Progress Pengaduan
        </h3>
  
        <div className="space-y-4">
  
          {steps.map((step, index) => {
  
            const active =
              index <= currentIndex;
  
            return (
  
              <div
                key={step}
                className="flex items-center gap-3"
              >
  
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    active
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {active ? "✓" : ""}
                </div>
  
                <span
                  className={
                    active
                      ? "font-semibold"
                      : "text-gray-500"
                  }
                >
                  {step}
                </span>
  
              </div>
  
            );
  
          })}
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default TrackingTimeline;