import React from 'react';

const SizeChart = () => {
  const sizes = [
    { size: 'S', chest: '34-36"', waist: '28-30"', hips: '35-37"' },
    { size: 'M', chest: '38-40"', waist: '32-34"', hips: '39-41"' },
    { size: 'L', chest: '42-44"', waist: '36-38"', hips: '43-45"' },
    { size: 'XL', chest: '46-48"', waist: '40-42"', hips: '47-49"' },
  ];

  return (
    <div className="overflow-x-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Size Chart</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-6 text-left">Size</th>
            <th className="py-3 px-6 text-left">Chest</th>
            <th className="py-3 px-6 text-left">Waist</th>
            <th className="py-3 px-6 text-left">Hips</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-3 px-6">{item.size}</td>
              <td className="py-3 px-6">{item.chest}</td>
              <td className="py-3 px-6">{item.waist}</td>
              <td className="py-3 px-6">{item.hips}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizeChart;
