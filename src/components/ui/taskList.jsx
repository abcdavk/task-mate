export function ToDoItems({ judul, tgl, selesai, update }) {
  return (
    <div className="todo flex">
      <input type="checkbox" name="todo1" id="todo1"></input>
      <h1>{judul}</h1>
      <p>{tgl}</p>
    </div>
  );
}
