type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h2 className=" tex-md font-semibold mb-2">Max Price</h2>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(evet) =>
          onChange(evet.target.value ? parseInt(evet.target.value) : undefined)
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(
          (price) => (
            <option key={price} value={price}>
              {price}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default PriceFilter;
