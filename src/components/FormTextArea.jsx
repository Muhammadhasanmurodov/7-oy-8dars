export default function FormTextArea({label, name, type}) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea className="textarea" type={type} name={name} placeholder="Bio"></textarea>
    </div>
  );
}
