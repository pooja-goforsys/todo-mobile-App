// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ATTENDANCE_KEY = "ATTENDANCE_TODAY";

// const getTodayDate = () =>
//   new Date().toISOString().split("T")[0];

// export const getTodayAttendance = async () => {
//   const data = await AsyncStorage.getItem(ATTENDANCE_KEY);
//   if (!data) return null;

//   const parsed = JSON.parse(data);
//   if (parsed.date !== getTodayDate()) return null;

//   return parsed;
// };

// export const checkIn = async () => {
//   const attendance = {
//     date: getTodayDate(),
//     checkIn: new Date().toISOString(),
//     checkOut: null,
//     breaks: [],
//     status: "ON_WORK",
//   };

//   await AsyncStorage.setItem(
//     ATTENDANCE_KEY,
//     JSON.stringify(attendance)
//   );
//   return attendance;
// };

// export const startBreak = async () => {
//   const attendance = await getTodayAttendance();
//   if (!attendance) return null;

//   attendance.breaks.push({
//     start: new Date().toISOString(),
//     end: null,
//   });

//   attendance.status = "ON_BREAK";
//   await AsyncStorage.setItem(
//     ATTENDANCE_KEY,
//     JSON.stringify(attendance)
//   );
//   return attendance;
// };

// export const endBreak = async () => {
//   const attendance = await getTodayAttendance();
//   if (!attendance) return null;

//   const lastBreak =
//     attendance.breaks[attendance.breaks.length - 1];

//   if (lastBreak && !lastBreak.end) {
//     lastBreak.end = new Date().toISOString();
//   }

//   attendance.status = "ON_WORK";
//   await AsyncStorage.setItem(
//     ATTENDANCE_KEY,
//     JSON.stringify(attendance)
//   );
//   return attendance;
// };

// export const checkOut = async () => {
//   const attendance = await getTodayAttendance();
//   if (!attendance) return null;

//   attendance.checkOut = new Date().toISOString();
//   attendance.status = "CHECKED_OUT";

//   await AsyncStorage.setItem(
//     ATTENDANCE_KEY,
//     JSON.stringify(attendance)
//   );
//   return attendance;
// };
