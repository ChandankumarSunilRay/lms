import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";
import { Progress } from "../models/Progress.js";
import mongoose from "mongoose";

// Utility: check if ObjectId is valid
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({ courses });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  const course = await Courses.findById(id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  res.json({ course });
});

export const fetchLectures = TryCatch(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  const lectures = await Lecture.find({ course: id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(id)) {
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });
  }

  res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid lecture ID" });
  }

  const lecture = await Lecture.findById(id);
  if (!lecture) return res.status(404).json({ message: "Lecture not found" });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(lecture.course.toString())) {
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });
  }

  res.json({ lecture });
});

export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: { $in: req.user.subscription } });
  res.json({ courses });
});

export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  const course = await Courses.findById(id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (user.subscription.includes(course._id.toString())) {
    return res.status(400).json({ message: "You already have this course" });
  }

  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(201).json({ order, course });
});

export const paymentVerification = TryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.Razorpay_Secret)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    return res.status(400).json({ message: "Payment Failed" });
  }

  await Payment.create({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  const user = await User.findById(req.user._id);

  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  const course = await Courses.findById(id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  user.subscription.push(course._id);

  await Progress.create({
    course: course._id,
    completedLectures: [],
    user: req.user._id,
  });

  await user.save();

  res.status(200).json({ message: "Course Purchased Successfully" });
});

export const addProgress = TryCatch(async (req, res) => {
  const { course, lectureId } = req.query;

  if (!isValidObjectId(course) || !isValidObjectId(lectureId)) {
    return res.status(400).json({ message: "Invalid course or lecture ID" });
  }

  const progress = await Progress.findOne({
    user: req.user._id,
    course,
  });

  if (!progress) {
    return res.status(404).json({ message: "Progress not found" });
  }

  if (progress.completedLectures.includes(lectureId)) {
    return res.json({ message: "Progress recorded" });
  }

  progress.completedLectures.push(lectureId);
  await progress.save();

  res.status(201).json({ message: "New progress added" });
});

export const getYourProgress = TryCatch(async (req, res) => {
  const { course } = req.query;

  if (!isValidObjectId(course)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  const progress = await Progress.findOne({
    user: req.user._id,
    course,
  });

  if (!progress) return res.status(404).json({ message: "Progress not found" });

  const allLectures = await Lecture.countDocuments({ course });

  const completedLectures = progress.completedLectures.length;

  const courseProgressPercentage = allLectures
    ? Math.round((completedLectures * 100) / allLectures)
    : 0;

  res.json({
    courseProgressPercentage,
    completedLectures,
    allLectures,
    progress,
  });
});
