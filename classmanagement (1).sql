-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 06, 2021 lúc 06:50 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `classmanagement`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `googleId` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `mssv` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `googleId`, `email`, `name`, `phone`, `mssv`) VALUES
(1, 'tanthai', '123456', '', 'tanthai172k@gmail.com', 'Tan Thai', '1111', '18127204'),
(2, 'quangtran', '123456', '', 'abc@gmail.com', 'Tran Minh Quang', '4444', '18127172'),
(3, 'nguyenxi', '11111', '', 'tuhoa123abc@gmail.com', 'Nguyen Xi', '55555', '18127111'),
(4, 'nguyenan', '11111', '', 'nvan@gmail.com', 'Nguyen An', '55555666', '18127166'),
(5, 'nguyenbinh', '11111', '', 'nvbinh@gmail.com', 'Nguyen An Binh', '55555666', '18127167'),
(6, 'nguyennhac', '11111', '', 'nnhac@gmail.com', 'Nguyen Nhac', '333', '18127777'),
(7, 'nguyensinh', '11111', '', 'nsinhc@gmail.com', 'Nguyen Sinh', '333', '18127774');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `assignment`
--

CREATE TABLE `assignment` (
  `id` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `grade` int(11) NOT NULL,
  `rank` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `assignment`
--

INSERT INTO `assignment` (`id`, `classId`, `name`, `creatorId`, `description`, `grade`, `rank`) VALUES
(1, 1, 'BTVN01', 1, 'practice function', 5, 1),
(2, 1, 'BTVN02', 1, 'practice vector', 5, 2),
(3, 1, 'Midterm', 1, 'practice complex number', 10, 3),
(4, 1, 'Final', 1, 'practice circle', 3, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `classaccount`
--

CREATE TABLE `classaccount` (
  `accountId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `classaccount`
--

INSERT INTO `classaccount` (`accountId`, `classId`, `role`) VALUES
(1, 1, 'teacher'),
(1, 2, 'teacher'),
(2, 1, 'student'),
(2, 2, 'student'),
(3, 1, 'student'),
(4, 1, 'student'),
(4, 2, 'student');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `room` varchar(100) NOT NULL,
  `link` varchar(100) NOT NULL,
  `creatorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `classes`
--

INSERT INTO `classes` (`id`, `name`, `description`, `room`, `link`, `creatorId`) VALUES
(1, 'mobile', 'android', 'A123', '1637069808370', 1),
(2, 'mobile advanced', 'react native', 'B111', '1637069808371', 1),
(3, 'web basic', 'javascrip', 'C03', '1637069808407', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `grade`
--

CREATE TABLE `grade` (
  `mssv` varchar(100) NOT NULL,
  `grade` float NOT NULL,
  `assignmentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `grade`
--

INSERT INTO `grade` (`mssv`, `grade`, `assignmentId`) VALUES
('18127172', 10, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `student`
--

CREATE TABLE `student` (
  `mssv` varchar(100) NOT NULL,
  `classId` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `student`
--

INSERT INTO `student` (`mssv`, `classId`, `fullName`) VALUES
('18127119', 1, 'Tran Quoc Huy');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`id`,`classId`);

--
-- Chỉ mục cho bảng `classaccount`
--
ALTER TABLE `classaccount`
  ADD PRIMARY KEY (`accountId`,`classId`);

--
-- Chỉ mục cho bảng `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`mssv`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `assignment`
--
ALTER TABLE `assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
