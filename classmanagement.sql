-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 01, 2022 lúc 06:17 PM
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
  `facebookId` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `mssv` varchar(100) NOT NULL,
  `emailVerify` varchar(100) NOT NULL,
  `lockacc` int(11) NOT NULL,
  `isadmin` int(11) NOT NULL,
  `createat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `googleId`, `facebookId`, `email`, `name`, `phone`, `mssv`, `emailVerify`, `lockacc`, `isadmin`, `createat`) VALUES
(1, 'tanthai', '123456', '109701161159153395364', '1172180179979558', 'tanthai172k@gmail.com', 'Tan Thai', '1111', '18127204', '', 0, 0, '2021-12-30T14:45:26.871Z'),
(2, 'quangtran', '123456', '', '', 'abc@gmail.com', 'Tran Minh Quang', '4444', '18127172', '', 0, 0, '2021-12-30T14:46:49.791Z'),
(3, 'nguyenxi', '11111', '', '', 'tuhoa999abc@gmail.com', 'Nguyen Xi', '55555', '18127111', '', 0, 0, '2021-12-30T14:48:27.991Z'),
(4, 'nguyenan', '11111', '', '', 'nvan@gmail.com', 'Nguyen An', '55555666', '18127166', '', 0, 0, '2021-12-30T15:39:25.929Z'),
(5, 'nguyenbinh', '11111', '', '', 'nvbinh@gmail.com', 'Nguyen An Binh', '55555666', '18127167', '', 0, 0, '2021-12-30T18:01:20.377Z'),
(6, 'nguyennhac', '11111', '', '', 'nnhac@gmail.com', 'Nguyen Nhac', '333', '18127777', '', 0, 0, '2021-12-30T18:05:48.114Z'),
(7, 'nguyensinh', '11111', '', '', 'quangminhtran323@gmail.com', 'Nguyen Sinh', '333', '18127774', '', 0, 0, '2021-12-30T18:06:05.226Z'),
(8, 'tanathai', '123456', '', '', 'thainhattan123abc@gmail.com', 'tanathai', '342686566', '', '', 0, 0, '2021-12-30T18:06:34.962Z'),
(9, 'abc', 'abc', '', '', 'abc', 'abc', 'abc', '', '', 0, 0, '2021-12-30T18:08:59.929Z'),
(10, 'tuhoa123abc', '45cbe4eb-0a74-4df1-8729-8366c3c7e86f', '110019825056745429601', '', 'tuhoa123abc@gmail.com', 'nguyen van giang', '012333', '', '', 0, 0, '2021-12-31T01:58:49.275Z'),
(11, 'admin', 'admin', '', '', 'admin@gmail.com', 'admin admin', '911', '', '', 0, 1, '2021-12-31T03:24:43.738Z'),
(12, 'admin1', '11111', '', '', 'haha@gmail.com', 'admin1', '963', '', '', 0, 1, '2021-12-31T03:30:07.214Z'),
(13, 'tanadmin', 'tanadmin', '', '', 'tanathai@gmail.com', 'tanadmin', '7899', '', '', 0, 1, '2022-01-01T09:05:15.749Z');

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
(1, 1, 'BTVN01', 1, 'practice function', 1, 3),
(2, 1, 'BTVN0200', 1, 'practice vector 3', 1, 4),
(4, 1, 'Final', 1, 'practice circle', 4, 5),
(6, 1, 'btcn000', 1, 'hihi', 1, 2),
(8, 1, 'Midterm', 1, 'BTGK', 2, 1);

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
(1, 4, 'teacher'),
(1, 5, 'teacher'),
(1, 6, 'teacher'),
(1, 7, 'teacher'),
(1, 8, 'teacher'),
(1, 9, 'teacher'),
(1, 10, 'teacher'),
(1, 11, 'teacher'),
(1, 12, 'teacher'),
(1, 13, 'teacher'),
(1, 15, 'teacher'),
(1, 16, 'teacher'),
(2, 1, 'student'),
(2, 2, 'student'),
(3, 1, 'student'),
(4, 1, 'student'),
(4, 2, 'student'),
(7, 1, 'student'),
(8, 1, 'teacher'),
(8, 4, 'student'),
(8, 6, 'student'),
(8, 14, 'teacher');

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
  `coderoom` varchar(100) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `createat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `classes`
--

INSERT INTO `classes` (`id`, `name`, `description`, `room`, `link`, `coderoom`, `creatorId`, `createat`) VALUES
(1, 'mobile', 'android', 'A123', '1637069808370', '1wh9f3h', 1, '2021-12-30T14:45:26.871Z'),
(2, 'mobile advanced', 'react native', 'B111', '1637069808371', 'rvm4a', 1, '2021-12-30T14:46:49.791Z'),
(3, 'web basic', 'javascrip', 'C03', '1637069808407', '6lk0ri', 1, '2021-12-30T14:48:27.991Z'),
(4, 'web advance', '7:30-11:30', 'F204', '1638791434437', 'ft2oufk', 1, '2021-12-30T15:39:25.929Z'),
(5, 'HDH', '7:30-11:30', 'F111', '1638791598904', 'd8mk3r', 1, '2021-12-30T18:01:20.377Z'),
(6, 'MMT', '7:30-11:30', 'F111', '1638791842257', 'fctxhv', 1, '2021-12-30T18:05:48.114Z'),
(7, 'AI', '7:30-11:30', 'F111', '1638791962583', 'vz45hsf', 1, '2021-12-30T18:06:05.226Z'),
(8, 'MMT1', '7:30-11:30', 'F111', '1638792091674', 'jzw6jp', 1, '2021-12-30T18:06:34.962Z'),
(9, 'MMT2', '7:30-11:30', 'F111', '1638792195964', 'eb9qn', 1, '2021-12-30T18:08:59.929Z'),
(10, 'MMT3', '7:30-11:30', 'F025', '1638792462905', '1kd05l', 1, '2021-12-31T01:58:49.275Z'),
(11, 'MMT4', '7:30-11:30', 'F111', '1638793812299', 'f5ajcr', 1, '2021-12-31T03:24:43.738Z'),
(12, 'MMT5', '7:30-11:30', 'F104', '1638793908658', 'y7sol6f', 1, '2021-12-31T03:30:07.214Z'),
(13, 'MMT6', '2h-5h', 'A333', '1638840307662', 'w7qpa1', 1, '2022-01-01T09:05:15.749Z'),
(14, 'aladan', '7:30-11:30', 'hahaha', '1639120319906', '5morpa', 8, '2022-01-01T13:07:10.732Z'),
(15, 'MMT7', '2h-5h', 'A222', '1640678349258', '3s7k12gawe', 1, '2022-01-01T13:08:29.568Z'),
(16, 'MMT8', '7:30-11:30', 'F02', '1640678796949', '3l6zsp9tjgl', 1, '2022-01-01T13:09:05.432Z');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `accountId` int(11) NOT NULL,
  `parentid` int(11) DEFAULT NULL,
  `createat` varchar(255) NOT NULL,
  `assignmentId` int(11) NOT NULL,
  `finalgrade` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `comment`, `username`, `accountId`, `parentid`, `createat`, `assignmentId`, `finalgrade`) VALUES
(1, 'First comment', 'quangtran', 2, 0, '2021-12-30T14:45:26.871Z', 8, -1),
(2, 'Second comment of first comment', 'tanthai', 1, 1, '2021-12-30T14:46:49.791Z', 8, -1),
(3, 'third comment of first comment', 'quangtran', 2, 1, '2021-12-30T14:48:27.991Z', 8, -1),
(4, 'Sencond comment', 'nguyenxi', 3, 0, '2021-12-30T15:39:25.929Z', 8, -1),
(5, 'Second comment', 'quangtran', 2, 0, '2021-12-30T18:01:20.377Z', 8, -1),
(6, 'Third comment', 'quangtran', 2, 0, '2021-12-30T18:05:48.114Z', 8, -1),
(7, 'First comment of third comment', 'quangtran', 2, 6, '2021-12-30T18:06:05.226Z', 8, -1),
(8, 'second comment of third comment', 'quangtran', 2, 6, '2021-12-30T18:06:34.962Z', 8, -1),
(9, 'continue 2nd cmt', 'quangtran', 2, 5, '2021-12-30T18:08:59.929Z', 8, -1),
(10, '4th comment of first comment', 'quangtran', 2, 1, '2021-12-31T01:58:49.275Z', 8, -1),
(11, '5th comment of first comment', 'tanthai', 1, 1, '2021-12-31T03:24:43.738Z', 8, -1),
(12, '6th comment of first comment', 'tanthai', 1, 1, '2021-12-31T03:30:07.214Z', 8, -1),
(13, 'Student: quangtran - Grade composition: 2 - Current grade: 10 - Student Expectation grade: 10 - Student explanation: nothing :))', 'quangtran', 2, 0, '2021-12-31T03:34:40.993Z', 8, 9),
(14, 'what ???', 'tanthai', 1, 13, '2021-12-31T03:35:04.048Z', 8, -1),
(15, 'Please give a explanation !!!', 'tanthai', 1, 13, '2021-12-31T03:38:26.696Z', 8, -1),
(16, 'Sorry about my mistake :((', 'quangtran', 2, 13, '2021-12-31T03:39:05.624Z', 8, -1),
(17, 'My final decision is: 9 ', 'tanthai', 1, 13, '2021-12-31T09:43:03.223Z', 8, 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `grade`
--

CREATE TABLE `grade` (
  `mssv` varchar(100) NOT NULL,
  `grade` float NOT NULL,
  `assignmentId` int(11) NOT NULL,
  `classId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `grade`
--

INSERT INTO `grade` (`mssv`, `grade`, `assignmentId`, `classId`) VALUES
('18127111', 9, 4, 1),
('18127111', 9, 8, 1),
('18127166', 10, 1, 1),
('18127166', 10, 4, 1),
('18127166', 8, 8, 1),
('18127167', 10, 1, 1),
('18127167', 1, 4, 1),
('18127167', 7, 8, 1),
('18127172', 10, 4, 1),
('18127172', 9, 8, 1),
('18127998', 1, 4, 1),
('18127998', 6, 8, 1),
('18127999', 1, 4, 1),
('18127999', 6, 8, 1);

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
('18127111', 1, 'Nguyen Xi'),
('18127166', 1, 'Nguyen An'),
('18127167', 1, 'Nguyen An Binh'),
('18127172', 1, 'Tran Minh Quang'),
('18127998', 1, 'Tran Hung'),
('18127999', 1, 'Tran Cuong');

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
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`mssv`,`assignmentId`);

--
-- Chỉ mục cho bảng `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`mssv`,`classId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `assignment`
--
ALTER TABLE `assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
