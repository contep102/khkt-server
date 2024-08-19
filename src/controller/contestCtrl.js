import ContestComing from "../model/contestComingMdl.js";
import ContestFinished from "../model/contestFinishedMdl.js";
import ContestProgress from "../model/contestProgressMdl.js";
import Task from "../model/taskMdl.js";
import InfoTest from "../model/InfoTest.js";

export const createContest = async (req, res) => {
  try {
    const {
      Thoi_Gian_Bat_Dau_Dang_Ky,
      Thoi_Gian_Ket_Thuc_Dang_Ky,
      Thoi_Gian_Bat_Dau_Thi,
      Thoi_Gian_Ket_Thuc_Thi,
      Ten_Contest,
      Description,
      Admin,
    } = req.body;

    const checkContesti = await ContestComing.findOne({
      Ten_Contest: Ten_Contest,
    });
    const checkContestii = await ContestProgress.findOne({
      TenContest: Ten_Contest,
    });
    const checkContestiii = await ContestFinished.findOne({
      Ten_Contest: Ten_Contest,
    });
    if (checkContesti || checkContestii || checkContestiii) {
      return res.status(400).json("Name contest is exits!");
    }
    const contest = await ContestComing.create({
      Thoi_Gian_Bat_Dau_Dang_Ky,
      Thoi_Gian_Ket_Thuc_Dang_Ky,
      Thoi_Gian_Bat_Dau_Thi,
      Thoi_Gian_Ket_Thuc_Thi,
      Ten_Contest,
      Description,
      Admin,
    });
    return res.status(200).json(contest);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const updateContest = async (req, res) => {
  try {
    const {
      Thoi_Gian_Bat_Dau_Dang_Ky,
      Thoi_Gian_Ket_Thuc_Dang_Ky,
      Thoi_Gian_Bat_Dau_Thi,
      Thoi_Gian_Ket_Thuc_Thi,
      Ten_Contest,
      Description,
      Admin,
      Contest_Id,
    } = req.body;
    const contest = await ContestComing.findByIdAndUpdate(
      Contest_Id,
      {
        Thoi_Gian_Bat_Dau_Dang_Ky,
        Thoi_Gian_Ket_Thuc_Dang_Ky,
        Thoi_Gian_Bat_Dau_Thi,
        Thoi_Gian_Ket_Thuc_Thi,
        Ten_Contest,
        Description,
        Admin,
      },
      {
        returnOriginal: false,
      }
    );
    return res.status(200).json(contest);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const deleteAllTaskInContest = async (req, res) => {
  try {
    const { ContestId } = req.body;
    const newUp = await ContestComing.findByIdAndUpdate(ContestId, {
      Bo_Cau_Hoi: [],
    });
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const addUserToResContest = async (req, res) => {
  try {
    const { userId, contestId } = req.body;
    const newUp = await ContestComing.findByIdAndUpdate(
      contestId,
      { $push: { Thanh_Vien_Dang_Ky: userId } },
      { returnOriginal: false }
    );
    return res.status(200).json(newUp);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const deleteUserToResContest = async (req, res) => {
  try {
    const { userId, contestId } = req.body;
    const newUp = await ContestComing.findById(contestId);
    for (let i = 0; i < newUp.Thanh_Vien_Dang_Ky.length; ++i) {
      if (userId === newUp.Thanh_Vien_Dang_Ky[i]) {
        newUp.Thanh_Vien_Dang_Ky.splice(i, 1);
      }
    }
    newUp.save();
    return res.status(200).json(newUp);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getContest = async (req, res) => {
  try {
    const { idContest } = req.body;
    const findComingContest = await ContestComing.findById(idContest);
    const findProgressContest = await ContestProgress.findById(idContest);
    const findFinishedContest = await ContestFinished.findById(idContest);
    if (!findComingContest && !findProgressContest && !findFinishedContest) {
      return res.status(210).json("No thing");
    }
    if (findComingContest) {
      return res.status(200).json(findComingContest);
    }
    if (findProgressContest) {
      return res.status(200).json(findProgressContest);
    }
    if (findFinishedContest) {
      return res.status(200).json(findFinishedContest);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getContestComing = async (req, res) => {
  try {
    const data = await ContestComing.find().populate("Admin");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getContestComingById = async (req, res) => {
  try {
    const { userId } = req.body;
    const neww = await ContestComing.find({ Admin: userId });
    return res.status(200).json(neww);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getContestProgress = async (req, res) => {
  try {
    const data = await ContestProgress.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const uploadTask = async (req, res) => {
  try {
    const { contestId, task, a, b, c, d, cauTraLoi } = req.body;
    console.log(contestId, task, a, b, c, d, cauTraLoi);
    const newUp = await Task.create({
      contestId: contestId,
      task: task,
      a,
      b,
      d,
      d,
      answer: cauTraLoi,
    });
    console.log(newUp);

    const newUpContest = await ContestComing.findByIdAndUpdate(
      contestId,
      { $push: { Bo_Cau_Hoi: newUp._id } },
      { returnOriginal: false }
    );

    return res.status(200).json(newUpContest);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getContestProgressId = async (req, res) => {
  try {
    const { contestId } = req.body;
    const newD = await ContestProgress.findById(contestId);
    if (!newD) return res.status(200).json("");
    return res.status(200).json(newD);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getContestProgressIdAdmin = async (req, res) => {
  try {
    const { adminId } = req.body;
    const data = await ContestProgress.find({ admin: adminId });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(400).json("Task is not exits!");
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { nameContest, TaskId } = req.body;
    const newUp = await ContestComing.findOneAndUpdate(
      { Ten_Contest: nameContest },
      {
        $pull: {
          Bo_Cau_Hoi: TaskId,
        },
      },
      { returnOriginal: false }
    );
    const deleteTask = await Task.findOneAndDelete({
      Ten_Contest: nameContest,
    });
    return res.status(200).json(newUp);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const submitResult = async (req, res) => {
  try {
    const { ThiSinh, MangTraLoi, ContestId, OutTab, ThoiGian } = req.body;

    const ct = await ContestProgress.findById(ContestId);
    console.log(ct);

    const MangKetQua = ct.Mang_Cau_Tra_Loi;
    let core = 0;
    let mangsai = [];
    for (let i = 0; i < MangKetQua.length; ++i) {
      if (MangKetQua[i] === MangTraLoi[i]) core = core + 1;
      else mangsai.push((i + 1).toString());
    }
    const uyt = `${core}/${MangKetQua.length}`;
    const info = await InfoTest.create({
      Thi_Sinh: ThiSinh,
      Contest_Id: ContestId,
      So_Lan_Thoat_Tab: OutTab,
      So_Thoi_Gian_Lam_Xong: ThoiGian,
      Cac_Cau_Sai: mangsai,
      So_Diem: uyt,
    });
    return res.status(200).json(info);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const StartExam = async (req, res) => {
  try {
    const { userId, id } = req.body;
    const contest = await ContestProgress.findById(id);
    if (!contest) {
      return res.status(400).json("Contest is not exits!");
    }

    const test = contest.Thanh_Vien_Dang_Ky.includes(userId);

    if (!test) {
      return res.status(400).json("You is not register!");
    }
    contest.Thanh_Vien_Tham_Gia.push(userId);
    contest.save();
    return res.status(200).json(contest.Mang_Cau_Hoi);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const deleteContestComing = async (req, res) => {
  try {
    const { userId, contestId } = req.body;
    console.log(userId, contestId);
    const dataContest = await ContestComing.findById(contestId);
    console.log(dataContest);
    if (dataContest.Admin.toString() !== userId) {
      return res.status(400).json("You not is require!");
    }
    const dataDeleteContestComing = await ContestComing.findByIdAndDelete(
      contestId
    );
    return res.status(200).json("Ok");
  } catch (error) {
    return res.status(400).json(error);
  }
};
