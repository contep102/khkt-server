import mongoose, { mongo } from "mongoose";
const contest = new mongoose.Schema({
  TenContest: String,
  Thoi_Gian_Thi: { type: Date },
  Thoi_Gian_Ket_Thuc: { type: Date },
  Thanh_Vien_Dang_Ky: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  Thanh_Vien_Tham_Gia: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  So_Bai_Nop: { type: Number, default: 0 },
  Mang_Cau_Hoi: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  Mang_Cau_Tra_Loi: [{ type: String }],
  admin: mongoose.Schema.Types.ObjectId,
});
const ContestProgress = mongoose.model("ContestProgress", contest);

export default ContestProgress;
