// style 코드는 추후 css로 뺼 수 있으면 빼야함

const ToggleBtn = () => {
  return (
    <div className="flex items-center justify-center w-full mb-12">
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" id="toggleB" className="sr-only" />
          <div className="block bg-white w-14 h-8 rounded-full border-2 border-gray-400"></div>
          <div className="dot absolute left-1 top-1 bg-gray-400 w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
      <style>{`
        input:checked ~ .dot {
          transform: translateX(100%);
          background-color: #129B07;
        }
        input:checked ~ .block {
          background-color: #129B0740;
          border-color: #129B07;
        }
      `}</style>
    </div>
  );
};

export default ToggleBtn;
