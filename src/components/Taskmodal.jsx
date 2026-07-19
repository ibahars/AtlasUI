import { useState } from "react";
import AppButton from "./UI/AppButton";

const initialState = {
  title: "",
  description: "",
  type: "task",
  status: "todo",
  priority: "mid",
};
const Taskmodal = ({
  isOpen,
  onClose,
  onAddTask,
  onUpdateTask,
  editingTask,
}) => {
  const [formData, setFormData] = useState(editingTask || initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (editingTask) {
      onUpdateTask(formData);
    } else {
      onAddTask(formData);
    }
    onClose();
    setFormData(initialState);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl mx-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Yeni Görev Ekle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Görev Başlığı
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Örn: Raporu tamamla..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
              placeholder="Görev detaylarını buraya yazın..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tür
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="pr-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer transition-all"
            >
              {" "}
              <option value="bug">Bug </option>
              <option value="task">Görev </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durum
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer transition-all"
            >
              {" "}
              <option value="todo">Yapılacak</option>
              <option value="progress">Devam Ediliyor</option>
              <option value="done">Tamamlandı</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Öncelik
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer transition-all"
            >
              {" "}
              <option value="low" className="text-blue-600">
                Düşük
              </option>
              <option value="mid" className="text-yellow-600">
                Orta
              </option>
              <option value="high" className="text-red-600">
                Yüksek
              </option>
            </select>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <AppButton
              type="button"
              onClick={onClose}
              children={"Vazgeç"}
              color={"bg-gray-600"}
            />
            <AppButton children={"Kaydet"} color={"bg-indigo-600"} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Taskmodal;
