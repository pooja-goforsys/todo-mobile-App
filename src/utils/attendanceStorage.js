import AsyncStorage from "@react-native-async-storage/async-storage";

const ATTENDANCE_KEY = "TODAY_ATTENDANCE";

export const getTodayAttendance = async () => {
  const data = await AsyncStorage.getItem(ATTENDANCE_KEY);
  return data ? JSON.parse(data) : null;
};

const saveAttendance = async (data) => {
  await AsyncStorage.setItem(ATTENDANCE_KEY, JSON.stringify(data));
};

export const checkIn = async () => {
  const attendance = {
    checkIn: new Date().toISOString(),
    checkOut: null,
    status: "ON_WORK",
    breaks: [],
  };
  await saveAttendance(attendance);
  return attendance;
};

export const startBreak = async () => {
  const data = await getTodayAttendance();
  if (!data || data.status !== "ON_WORK") return;

  data.status = "ON_BREAK";
  data.breaks.push({
    start: new Date().toISOString(),
    end: null,
  });

  await saveAttendance(data);
};

export const resumeWork = async () => {
  const data = await getTodayAttendance();
  if (!data || data.status !== "ON_BREAK") return;

  const lastBreak = data.breaks[data.breaks.length - 1];
  if (lastBreak && !lastBreak.end) {
    lastBreak.end = new Date().toISOString();
  }

  data.status = "ON_WORK";
  await saveAttendance(data);
};

export const checkOut = async () => {
  const data = await getTodayAttendance();
  if (!data || data.checkOut) return;

  data.checkOut = new Date().toISOString();
  data.status = "CHECKED_OUT";
  await saveAttendance(data);
};
