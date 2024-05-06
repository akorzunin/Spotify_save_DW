import dayjs from 'dayjs';

export const getLocation = () => {
  const pref = window.location.href.split('//')[0];
  const location = window.location.href.split('//')[1].split('/')[0];
  return [pref, location];
};

export const getUserData = async (userId: string): Promise<any> => {
  return fetch(`${import.meta.env.VITE_API_URL}/api/user?user_id=${userId}`, {
    headers: {
      accept: 'application/json',
    },
  })
    .then((res: Response) => {
      if (res.status === 404) {
        return false;
      }
      return res.json();
    })
    .then((data: any) => data);
};

export const createUser = async (userId: string, userData): Promise<any> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/new_user`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  console.log('User created: ', data);

  return data;
};
export const updateUserData = async (userId, updateData): Promise<any> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/update_user?user_id=${userId}`,
    {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    }
  );

  const data = await res.json();
  return data;
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
