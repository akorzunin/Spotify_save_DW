// @ts-nocheck
// TODO fix types
import dayjs from 'dayjs';
import {
  ApiService,
  CreateUser,
  OpenAPI,
  UpdateUser,
  User,
} from '../api/client';

export const getLocation = () => {
  const pref = window.location.href.split('//')[0];
  const location = window.location.href.split('//')[1].split('/')[0];
  return [pref, location];
};

export const getUserDataApi = async (userId: string): Promise<User> => {
  const res = await ApiService.getUserApiUserGet(userId);
  return res;
};

export const createUser = async (userData: CreateUser): Promise<User> => {
  return await ApiService.createUserApiNewUserPost(userData);
};

export const getOrCreateUser = async (userId: string) => {
  if (!userId) {
    return null;
  }
  try {
    const userData = await getUserDataApi(userId);
    return userData;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        const res = await createUser({
          user_id: userId,
          is_premium: false,
          refresh_token: '',
        });
        return res;
      }
    }
    console.error(error);
  }
  return null;
};
export const updateUserData = async (userId, updateData): Promise<unknown> => {
  const res = await fetch(`${OpenAPI.BASE}/api/update_user?user_id=${userId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  const data = await res.json();
  return data;
};

export const updateUserDataV2 = async (
  userId: string,
  updateUser: UpdateUser
): Promise<User> => {
  return await ApiService.updateUserApiUpdateUserPut(userId, updateUser);
};

export const getDbData = (item, data, formDataMap) => {
  return data[formDataMap[item.id]];
};

export const parseDateFromDb = (dbData, item, formDataMap) => {
  const time = dbData[formDataMap[item.id]];
  // "2022-08-21T20:11:19.981Z" from db
  const dayjsDate = dayjs(time);
  return dayjsDate.format().slice(0, -9);
};

export const parseFormOutputDate = (value) => {
  const dayjsDate = dayjs(value);
  return dayjsDate.format();
};

export const parseFormData = (formData, formDataMap) => {
  const UpdateData = {};
  Object.entries(formData).forEach(([key, value]) => {
    UpdateData[formDataMap[key]] = value;
  });
  return UpdateData;
};
