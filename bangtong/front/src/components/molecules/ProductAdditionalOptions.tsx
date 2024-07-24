import React from "react";

interface Props {
  additionalOptions: Array<string>;
}

const ProductAdditionalOptions: React.FC<Props> = ({ additionalOptions }) => {
  return (
    <React.Fragment>
      <h1 className="text-2xl font-black">추가옵션 (구매가능)</h1>
      <div className="flex flex-wrap text-center mt-5">
        {additionalOptions.map((item) => (
          <div className="m-2">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductAdditionalOptions;
