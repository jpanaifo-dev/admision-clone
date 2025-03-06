export const SpinnerLoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin" />
          <span>Procesando...</span>
        </div>
      </div>
    </div>
  );
};
