function JustCheckbox({ selesai }) {
  return (
    <div className={"w-5 h-5 rounded-full border-2 flex items-center justify-center " + (selesai ? "border-slate-400" : "border-slate-800")}>
      {
        selesai && (
          <div className="w-3 h-3 rounded-full bg-slate-400">
            
          </div>
        )
      }
    </div>
  )
}

export function ToDoItems({ judul, tgl, selesai, update }) {
  return (
    <div className={"rounded-2xl w-[calc(100%-2rem)] max-w-3xl p-5 shadow-lg shadow-slate-400/10 backdrop-blur-sm hover:-translate-y-1 transition-all flex gap-3 " + (selesai ? "bg-purple-200/40" : "bg-white/75")}>
      <div className="flex items-center">
        <JustCheckbox selesai={selesai}/>
      </div>
      <div>
        <h3 className={selesai ? "text-slate-500 line-through" : "text-slate-800"}>{judul}</h3>
        <span className="text-sm text-slate-500">{tgl}</span>
      </div>
    </div>
  );
}
