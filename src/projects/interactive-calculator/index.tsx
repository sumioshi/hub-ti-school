import { useState } from 'react';

export function InteractiveCalculator() {
  const [display, setDisplay] = useState('0');
  
  // Basic calculator implementation
  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };
  
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Interactive Calculator</h2>
      <div className="border border-[#1A1A1A] rounded-lg p-4 bg-[#0D0D0D]">
        <div className="bg-[#1A1A1A] p-4 rounded mb-4 text-right text-2xl text-white">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {/* Add calculator buttons here */}
          <button
            onClick={() => handleNumber('1')}
            className="p-4 text-lg font-medium bg-[#1A1A1A] text-white rounded hover:bg-[#262626] transition-colors"
          >
            1
          </button>
          {/* Add more buttons as needed */}
        </div>
      </div>
    </div>
  );
}