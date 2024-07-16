const ToggleBtn = () => {
  return (
    <div className="flex items-center justify-center w-full mb-12">
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" id="toggleB" className="sr-only" />
          <div className="block bg-gray-200 w-14 h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
      <style>{`
        input:checked ~ .dot {
          transform: translateX(100%);
          background-color: #48bb78;
        }
      `}</style>
    </div>
  );
};

export default ToggleBtn;
