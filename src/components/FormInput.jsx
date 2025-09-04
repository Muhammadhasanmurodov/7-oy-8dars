export default function FormInput({ label, name, type }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={name}
        className="w-full px-4 py-2 rounded-xl 
                   bg-white/10 border border-white/20 
                   placeholder-gray-300 text-white
                   backdrop-blur-md focus:outline-none 
                   focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
