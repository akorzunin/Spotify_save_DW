import { useState, useEffect, FC } from 'react';
import AccountStatus from './AccountStatus';
import SettingsTitle from './SettingsTitle';
import {
  getUserDataApi,
  getDbData,
  parseDateFromDb,
  updateUserData,
  parseFormData,
  parseFormOutputDate,
} from '../../utils/dbManager';
import { formDataMap } from '../../interfaces/FormDataMap';
import { Button } from '../../shadcn/ui/button';

export const TextFormStyle =
  'w-full mb-3 appearance-none block bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white';
export const CheckboxFormStyle =
  'w-4 h-4 bg-gray-100 rounded border-transparent cursor-pointer';
export const HintFormStyle =
  'text-sm font-light text-white bg-gray-500 absolute max-w-[192px] rounded-md transition-all duration-600 ease-in-out text-shadow-md';
let didMount = false;

interface ISettingsPanel {
  IsPremium: boolean;
  userId: string | undefined;
  DwPlaylistId: string;
}

const SettingsPanel: FC<ISettingsPanel> = ({
  IsPremium,
  userId,
  DwPlaylistId,
}) => {
  const [AutosaveHint, setAutosaveHint] = useState(false);
  const [FilterDislikesHint, setFilterDislikesHint] = useState(false);
  const [SaveFullPlHint, setSaveFullPlHint] = useState(false);
  const [SendmailHint, setSendmailHint] = useState(false);
  const [SubmitMessage] = useState('');
  const [autosaveChecked, setAutosaveChecked] = useState(false);
  const [filterDislikesChecked, setFilterDislikesChecked] = useState(false);
  const showHint = (event: { target: { id: string } }) => {
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
  const hideHint = (event: { target: { id: string } }) => {
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
  const handleSubmit = (event: {
    currentTarget: { elements: Iterable<unknown> | ArrayLike<unknown> };
  }) => {
    const formData = {};
    Array.from(event.currentTarget.elements).map((item: HTMLInputElement) => {
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
      const DWLinkForm = document.querySelector('#dw-link') as HTMLInputElement;
      if (DWLinkForm.value != DwPlaylistId) {
        DWLinkForm.value = DwPlaylistId;
      }
    }
  }, [DwPlaylistId]);

  useEffect(() => {
    if (!didMount && userId) {
      getUserDataApi(userId).then((data) => {
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
    <div className="w-[448px]">
      <SettingsTitle />
      <AccountStatus IsPremium={IsPremium} />
      <div className="m-3 rounded-md bg-secondary bg-opacity-30 p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="relative flex items-center">
            <input
              id="email-checkbox"
              type="checkbox"
              className="check"
              onChange={handleShowEmailField}
            />
            <label
              id="email-checkbox-label"
              htmlFor="email-checkbox"
              className="cursor-pointer whitespace-nowrap py-2 font-medium text-primary-foreground"
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
            <input
              id="dw-link"
              type="text"
              placeholder="Discover Weekly playlist id"
              className={`${TextFormStyle}`}
            />
          </div>
          <div className="relative flex items-center">
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
              className="cursor-pointer whitespace-nowrap font-medium text-primary-foreground"
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
                  className="mx-2 cursor-pointer whitespace-nowrap font-medium text-primary-foreground"
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
                      className="mx-2 cursor-pointer whitespace-nowrap font-medium text-primary-foreground"
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
          <div className="flex justify-end py-3">
            <div>{SubmitMessage}</div>
            <Button>Submit</Button>
          </div>
        </form>
        <div className="flex w-48 flex-col gap-y-3">
          <Button>Collect current DW</Button>
          <Button>Play DW playlist</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
