import React, { useState, useEffect, FC } from 'react';
import AccountStatus from './AccountStatus';
import SettingsTitle from './SettingsTitle';
import {
  getUserData,
  createUser,
  getDbData,
  parseDateFromDb,
  updateUserData,
  parseFormData,
  parseFormOutputDate,
} from '../../utils/dbManager';
import { formDataMap } from '../../interfaces/FormDataMap';
import Button from '../buttons/BaseButton';

export const TextFormStyle =
  'w-full mb-3 appearance-none block bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white';
export const CheckboxFormStyle =
  'w-4 h-4 bg-gray-100 rounded border-transparent cursor-pointer';
export const HintFormStyle =
  'text-sm font-light text-white bg-gray-500 absolute max-w-[192px] rounded-md transition-all duration-600 ease-in-out text-shadow-md';
let didMount = false;

interface ISettingsPanel {
  IsPremium: boolean;
  userId: string;
  cookie: {
    refresh_token: VoidFunction;
  };
  DwPlaylistId: string;
}

const SettingsPanel: FC<ISettingsPanel> = ({
  IsPremium,
  userId,
  cookie,
  DwPlaylistId,
}) => {
  const [AutosaveHint, setAutosaveHint] = useState(false);
  const [FilterDislikesHint, setFilterDislikesHint] = useState(false);
  const [SaveFullPlHint, setSaveFullPlHint] = useState(false);
  const [SendmailHint, setSendmailHint] = useState(false);
  const [SubmitMessage, setSubmitMessage] = useState('');
  const [autosaveChecked, setAutosaveChecked] = useState(false);
  const [filterDislikesChecked, setFilterDislikesChecked] = useState(false);
  const showHint = (event) => {
    if (event) {
      if (event.target.id == 'autosave') {
        setAutosaveHint(true);
      }
      if (event.target.id == 'email-checkbox-label') {
        setSendmailHint(true);
      }
      if (event.target.id == 'filter-dislikes') {
        setFilterDislikesHint(true);
      }
      if (event.target.id == 'save-full-playlist') {
        setSaveFullPlHint(true);
      }
    }
  };
  const hideHint = (event) => {
    if (event) {
      if (event.target.id == 'autosave') {
        setAutosaveHint(false);
      }
      if (event.target.id == 'email-checkbox-label') {
        setSendmailHint(false);
      }
      if (event.target.id == 'filter-dislikes') {
        setFilterDislikesHint(false);
      }
      if (event.target.id == 'save-full-playlist') {
        setSaveFullPlHint(false);
      }
    }
  };
  const handleSubmit = (event) => {
    let formData = {};
    Array.from(event.currentTarget.elements).map((item: any) => {
      if (!item.id) return null;
      if (item.type === 'checkbox') {
        return (formData[item.id] = item.checked);
      }
      if (item.type === 'datetime-local') {
        if (item.value) {
          return (formData[item.id] = parseFormOutputDate(item.value));
        }
      }
      if (item.value) {
        return (formData[item.id] = item.value);
      }
      formData[item.id] = '';
    });
    console.table(formData);
    const updateData = parseFormData(formData, formDataMap);
    updateUserData(userId, updateData);
  };

  const setFormData = (data) => {
    // restore form data from db
    Array.from(document.forms[0]).map((item: any) => {
      if (item.type === 'checkbox') {
        return (item.checked = getDbData(item, data, formDataMap));
      }
      if (item.type === 'datetime-local') {
        return (item.value = parseDateFromDb(data, item, formDataMap));
      }
      if (item.type === 'submit') {
        return;
      }
      return (item.value = getDbData(item, data, formDataMap));
    });
  };
  // automatically pick up dw palylist id for user
  useEffect(() => {
    if (DwPlaylistId) {
      // @ts-ignore cant use `as HTMLInputElement` bc of webpack error
      const DWLinkForm: HTMLInputElement = document.querySelector('#dw-link');
      if (DWLinkForm.value != DwPlaylistId) {
        DWLinkForm.value = DwPlaylistId;
      }
    }
  }, [DwPlaylistId]);

  useEffect(() => {
    if (!didMount) {
      getUserData(userId).then((data) => {
        if (!data) {
          // create user
          const userData = {
            user_id: userId,
            is_premium: IsPremium,
            refresh_token: cookie.refresh_token,
          };
          createUser(userId, userData);
        }
        console.table(data);
        // set user settings
        setFormData(data);
      });
    }
    return () => {
      didMount = true;
    };
  }, []);
  const [emailFormActive, setEmailFormActive] = useState(false);
  const handleShowEmailField = (e) => {
    setEmailFormActive(e.target.checked);
  };

  return (
    <div className="mb-3 w-[448px]">
      <SettingsTitle />
      <AccountStatus IsPremium={IsPremium} />
      <div className="mx-3 mt-3 rounded-md bg-emerald-600 bg-opacity-20 p-3">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="relative mb-4 flex items-center">
            <input
              id="email-checkbox"
              type="checkbox"
              className="check"
              onChange={handleShowEmailField}
            />
            <label
              id="email-checkbox-label"
              htmlFor="email-checkbox"
              className="mx-2 cursor-pointer whitespace-nowrap font-medium text-gray-900"
              onMouseEnter={showHint}
              onMouseLeave={hideHint}
            >
              Send weekly email
            </label>
            {SendmailHint && (
              <p className={`${HintFormStyle} right-[30px] p-3`}>
                Send email everery week at Sunday to not forget/inform about DW
                playlist save
              </p>
            )}
          </div>
          {emailFormActive && (
            <div>
              <input
                id="email-input"
                className={`${TextFormStyle}`}
                type="email"
                placeholder="Email"
              />
              <input
                className={`${TextFormStyle}`}
                id="email-date-input"
                type="datetime-local"
              />
            </div>
          )}
          <div className="flex-none">
            <label
              id="dw-link-label"
              htmlFor="dw-link"
              className="mx-2 whitespace-nowrap font-medium text-gray-900"
            >
              Dw playlist id
            </label>
            <input
              id="dw-link"
              type="text"
              placeholder="Discover Weekly playlist id"
              className={`${TextFormStyle}`}
            />
          </div>
          <div className="relative mb-4 flex items-center">
            <input
              id="autosave-checkbox"
              type="checkbox"
              className="check"
              onClick={() => {
                setAutosaveChecked(!autosaveChecked);
              }}
            />
            <label
              id="autosave"
              htmlFor="autosave-checkbox"
              className="mx-2 cursor-pointer whitespace-nowrap font-medium text-gray-900"
              onMouseEnter={showHint}
              onMouseLeave={hideHint}
            >
              Autosave
            </label>
            {autosaveChecked && (
              <>
                <input
                  id="filter-dislikes-checkbox"
                  type="checkbox"
                  className="check"
                  onClick={() => {
                    setFilterDislikesChecked(!filterDislikesChecked);
                  }}
                />
                <label
                  id="filter-dislikes"
                  htmlFor="filter-dislikes-checkbox"
                  className="mx-2 cursor-pointer whitespace-nowrap font-medium text-gray-900"
                  onMouseEnter={showHint}
                  onMouseLeave={hideHint}
                >
                  Filter dislikes
                </label>
                {filterDislikesChecked && (
                  <>
                    <input
                      id="save-full-playlist-checkbox"
                      type="checkbox"
                      className="check"
                    />
                    <label
                      id="save-full-playlist"
                      htmlFor="save-full-playlist-checkbox"
                      className="mx-2 cursor-pointer whitespace-nowrap font-medium text-gray-900"
                      onMouseEnter={showHint}
                      onMouseLeave={hideHint}
                    >
                      Save full playlist
                    </label>
                  </>
                )}
              </>
            )}
            {AutosaveHint && (
              <p className={`${HintFormStyle} right-[100px] p-3`}>
                Save palylist automatically at choosen time UTC. Service need to
                play one of playlist songs to get playlist context
              </p>
            )}
            {FilterDislikesHint && (
              <div className={`${HintFormStyle} right-[-10px] p-3`}>
                <p>
                  Checked: Play all songs from playlist to filter only playable
                  ones
                </p>
                <p>Not checked: save DW playlist as is and don't use player</p>
              </div>
            )}
            {SaveFullPlHint && (
              <div className={`${HintFormStyle} right-[200px] p-3`}>
                <p>
                  Checked: Save playlist even none of 30 songs were disliked
                </p>
                <p>
                  Not checked: Consider such playlist as not listened thus don't
                  save it'
                </p>
              </div>
            )}
          </div>
          {autosaveChecked && (
            <input
              className={`${TextFormStyle}`}
              id="autosave-date-input"
              type="datetime-local"
            />
          )}
          <div className="flex justify-between">
            <div>{SubmitMessage}</div>
            <Button style="" title="Submit" color="bg-white h-10" />
          </div>
        </form>
        <div className="flex flex-col gap-y-3">
          <Button
            style=""
            title="Collect current DW"
            link={undefined}
            color="bg-white text-black w-40"
          />
          <Button
            style=""
            title="Play DW playlist"
            link={undefined}
            color="bg-white text-black w-36"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
