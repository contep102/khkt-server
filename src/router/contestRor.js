import express from "express";
import {
  addUserToResContest,
  createContest,
  deleteAllTaskInContest,
  deleteTask,
  deleteUserToResContest,
  getContest,
  getContestComing,
  getTask,
  StartExam,
  submitResult,
  updateContest,
  uploadTask,
  getContestProgress,
  getContestProgressId,
  getContestComingById,
  deleteContestComing,
  getContestProgressIdAdmin,
} from "../controller/contestCtrl.js";
const router = express.Router();

router.post("/create-contest", createContest);
router.post("/add-user-register", addUserToResContest);
router.post("/delete-user-register", deleteUserToResContest);
router.post("/get-contest", getContest);
router.post("/update-contest", updateContest);
router.post("/get-contest-coming", getContestComing);
router.post("/get-contest-progress", getContestProgress);
router.post("/get-contest-progress-id", getContestProgressId);
router.post("/upload-task", uploadTask);
router.post("/delete-task", deleteTask);
router.post("/submit-result", submitResult);
router.post("/get-task", getTask);
router.post("/start-exam", StartExam);
router.post("/deleteAllTaskInContest", deleteAllTaskInContest);
router.post("/get-contest-coming-id", getContestComingById);
router.post("/delete-contest-coming-id", deleteContestComing);
router.post("/get-contest-progress-id-admin", getContestProgressIdAdmin);

export default router;
